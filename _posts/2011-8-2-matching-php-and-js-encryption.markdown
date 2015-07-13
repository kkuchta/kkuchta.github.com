---
layout: post
title: Matching PHP and JS Encryption
mt_id: 22
date: 2011-08-02 00:05:25.000000000 -07:00
---
## Problem
You'd think that encryption is in encryption- AES is AES, DES is DES, etc.  Encrypt with scheme X, decrypt with scheme X, and it comes out clean.  Turns out, though, that it's not that easy.  Or rather, it is, but the relevant libraries on different platforms like to do things different.  Consider that to encrypt/decrypt something with AES you need:
<!--break-->

 - To use the same mode (CBC, EBC, etc)
 - The same block type for block cipher modes
 - The same key size (128 bit, 256 bit, etc)
 - The same key (of course)
 - The same initialization vector
 - To know whether the library pads/truncates your key
 - To know whether/how the library hashes your key
 - To know whether the library includes necessary extra information (plaintext size and IV) in its output or whether you need to keep track of that yourself
 - To know whether your ciphertext output it hex, base64 encoded, UTF8, or whatever.

In further fun, the libraries you're looking at may only expose half of these variables and just pick their own numbers for the other half.

So, when you need to encrypt something client-side and decrypt it in, say, PHP, it's not as simple as you'd like.

#### Quick Aside

Why would you want to encrypt client-side!  That's insane!  Well, the short version is that I'm not hiding data from bad guys- I'm hiding it from my own system.  What's happening is that the user is entering credential information for an external system.  That includes a username + password, plus some variable other stuff.  The variable other stuff (VOS for now) is what needs to get encrypted.  The username and password are already treated with kid gloves in our system- they're not saved, they're blocked out if a dev tries to log them, etc.  The VOS, though, is new, and we're passing it back as part of a complex data object that *isn't* treated carefully- it could end up in analytics, logs, dump files, emails, etc.  As such, we're encrypting it client-side with the user's password and decrypting it just before we need to send it to the external system (a point at which we also have the user's password).  As such, if it accidentally gets logged or something, it's not stored in the clear.

## Solution time

Not that complex, just putting it here because there didn't seem to be a good ready-made recommendation anywhere I google.

I ended up using [SlowAES](http://code.google.com/p/slowaes/), which is fast enough for many purposes.  It comes with parallel implementations in PHP, JS, Python and Ruby.  They each take the same parameters and use the same utilities, so it's easy to get them to line up.  To save you some time, here's a simple use example for PHP and JS (not thoroughly tested because we decided to go for another solution before this made it to that point, but anyway):

**encrypt.php**
	
	<?php
	require( 'slowaes/php/aes_fast.php');
	require( 'slowaes/php/cryptoHelpers.php');

	/*
	 * Encrypts and decrypts plaintext with a given key.  Written to be compatible
	 * with it's counterpart in js.  Uses AES.  Uses the slowAES encryption lib,
	 * which is more than fast enough for our purposes; using it here because it
	 * has several parallel versions in different languages (mainly php and js).
	 *
	 * Usage: Encrypt takes any string as the plaintext and any string as the key.
	 *		Decrypt takes the output of encrypt and the same key used to encrypt.
	 *
	 * Details you might care about:
	 *		The encryption output is really 3 space-seperated strings: 
	 *		- The length of the original plaintext string as an integer
	 *		- The Initialization Vector (iv).  This is just a random string that
	 *		  will be different each encryption, and can be sent in the clear
	 *		  with the ciphertext.  This is a hex string.
	 *		- The ciphertext itself, as a hex string.
	 *
	 * Crypto details you won't care about unless you're setting up another set of
	 * methods to match these ones:
	 *		- AES (Rijndael, or very close, I think)
	 *		- 256 bit key
	 *		- 128 bit IV
	 *		- CBC mode
	 *
	 **/
	function encrypt( $plaintext, $key ){

		// Set up encryption parameters.
		$plaintext_utf8 = utf8_encode($plaintext);
		$inputData = cryptoHelpers::convertStringToByteArray($plaintext);
		$keyAsNumbers = cryptoHelpers::toNumbers(bin2hex($key));
		$keyLength = count($keyAsNumbers);
		$iv = cryptoHelpers::generateSharedKey(16);

		$encrypted = AES::encrypt(
			$inputData,
			AES::modeOfOperation_CBC,
			$keyAsNumbers,
			$keyLength,
			$iv
		);

		// Set up output format (space delimeted "plaintextsize iv cipher")
		$retVal = $encrypted['originalsize'] . " "
			. cryptoHelpers::toHex($iv) . " "
			. cryptoHelpers::toHex($encrypted['cipher']);

		return $retVal;
	}

	function decrypt( $input, $key ){

		// Split the input into its parts
		$cipherSplit = explode( " ", $input);
		$originalSize = intval($cipherSplit[0]);
		$iv = cryptoHelpers::toNumbers($cipherSplit[1]);
		$cipherText = $cipherSplit[2];

		// Set up encryption parameters
		$cipherIn = cryptoHelpers::toNumbers($cipherText);
		$keyAsNumbers = cryptoHelpers::toNumbers(bin2hex($key));
		$keyLength = count($keyAsNumbers);
		
		$decrypted = AES::decrypt(
			$cipherIn,
			$originalSize,
			AES::modeOfOperation_CBC,
			$keyAsNumbers,
			$keyLength,
			$iv
		);

		// Byte-array to text.
		$hexDecrypted = cryptoHelpers::toHex($decrypted);
		$retVal = pack("H*" , $hexDecrypted);

		return $retVal;
	}

	/**
	 * Some simple testing code
	 **/

	$plaintext = "Testing the php encryption/decryption. Unicode LOD: ಠ_ಠ!";
	$key = "multipass!";
	$cipherText = encrypt($plaintext,$key);
	$result = decrypt($cipherText,$key);
	?>
	<!doctype html>
	<html lang="en"><head><meta charset="UTF-8"></head><body>
		<h1>Encrypting</h1>
		<b>plaintext:</b> <?= $plaintext ?> <br>
		<b>key:</b> <?= $key ?> <br>
		<b>raw cipherText:</b> <?= $cipherText ?> <br>
		<h1>Decrypting</h1>
		<b>result:</b><?= $result ?>
	</body></html>

**encrypt.js.html**

	/**
	 * An encryption setup to match our server-side one; see there for
	 * documentation on it.
	 **/
	function decrypt(input, key){

		// Split the input into its compontents
		var inputSplit = input.split(" ");
		var originalSize = parseInt(inputSplit[0]);
		var iv = cryptoHelpers.toNumbers(inputSplit[1]);
		var cipherIn = cryptoHelpers.toNumbers(inputSplit[2]);

		// Set up encryption parameters
		var keyAsNumbers = cryptoHelpers.toNumbers( bin2hex( key ) );

		var decrypted = slowAES.decrypt(
			cipherIn,
			slowAES.modeOfOperation.CBC,
			keyAsNumbers,
			iv
		);

		// Byte-array to text
		var retVal = hex2bin(cryptoHelpers.toHex(decrypted));
		retVal = cryptoHelpers.decode_utf8(retVal);

		return retVal;
	}

	function encrypt( plaintext, key ){

		// Set up encryption parameters
		plaintext = cryptoHelpers.encode_utf8(plaintext);
		var inputData = cryptoHelpers.convertStringToByteArray(plaintext);
		var keyAsNumber = cryptoHelpers.toNumbers(bin2hex(key));
		var iv = cryptoHelpers.generateSharedKey(16);
		
		var encrypted = slowAES.encrypt(
			inputData,
			slowAES.modeOfOperation.CBC,
			keyAsNumber,
			iv
		);

		// Set up output format (space delimeted "plaintextsize iv cipher")
		var retVal = plaintext.length + " "
			+ cryptoHelpers.toHex(iv) + " "
			+ cryptoHelpers.toHex(encrypted);

		return retVal;
	}

	// Equivilent to PHP bin2hex
	function bin2hex (s) {
		var i, f = 0,
			a = [];
	 
		s += '';
		f = s.length;
	 
		for (i = 0; i < f; i++) {
			a[i] = s.charCodeAt(i).toString(16).replace(/^([\da-f])$/, "0$1");
		}
	 
		return a.join('');
	}

	// Equivilent to PHP hex2bin
	function hex2bin(hex) {
		var str = '';
		for (var i = 0; i < hex.length; i += 2)
			str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
		return str;
	}

	/**
	 * Some simple testing code
	 **/
	$(function(){
		var key = "multipass!";
		var plaintext = "Testing the php encryption/decryption. Unicode LOD: ಠ_ಠ!";
		var output = "";
		var cipherText = encrypt(plaintext,key);
		var newPlaintext = decrypt(cipherText,key);
		output += ("<br>plaintext=" + plaintext);
		output += ("<br>cipherText=" + cipherText);
		output += ("<br>newPlaintext=" + newPlaintext);

		$('#output').html(output);
	});

Remember that this is probably neither efficient nor elegant.  It hasn't been tested extensively, so use at your own risk.  Should do the job, though.  The full code is zipped up here: <a href="http://kevinkuchta.webfactional.com/blog/JS_PHP_Encryption%202.zip">JS_PHP_Encryption 2.zip</a> 

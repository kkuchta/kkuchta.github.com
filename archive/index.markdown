---
layout: main
---
{% for post in site.posts %}

## <span class="archive-date">({{post.date | date: "%b '%y"}})</span>[ {{post.title}}]({{site.baseurl}}{{post.url}})

<div class="archive-summary">{{post.excerpt}}</div>

  [Read More]('{{site.baseurl}}{{post.url}}')
  <hr>
{% endfor %}

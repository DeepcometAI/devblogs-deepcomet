---
layout: page
title: Archive
description: Browse all blog posts by date
---

<div class="container">
  <div class="mainheading">
    <h1 class="posttitle">Archive</h1>
    <p class="lead">All posts from Deepcomet AI, organized by year</p>
  </div>

  <section class="archive">
    {% assign sorted_posts = site.posts | sort: 'date' | reverse %}
    {% assign current_year = '' %}
    {% for post in sorted_posts %}
      {% assign post_year = post.date | date: '%Y' %}
      {% if post_year != current_year %}
        {% if current_year != '' %}
          </ul>
        {% endif %}
        {% assign current_year = post_year %}
        <h2 class="archive-year">{{ post_year }}</h2>
        <ul class="archive-list">
      {% endif %}
      <li class="archive-item">
        <div class="archive-date">{{ post.date | date: "%b %d" }}</div>
        <div class="archive-content">
          <h3 class="archive-title">
            <a href="{{ post.url | relative_url }}">{{ post.title }}</a>
          </h3>
          {% if post.description %}
            <p class="archive-excerpt">{{ post.description }}</p>
          {% else %}
            <p class="archive-excerpt">{{ post.excerpt | strip_html | truncatewords: 20 }}</p>
          {% endif %}
        </div>
      </li>
    {% endfor %}
    {% if current_year != '' %}
      </ul>
    {% endif %}
  </section>
</div>

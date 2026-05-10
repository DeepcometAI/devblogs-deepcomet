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
    {% assign posts_by_year = site.posts | group_by_exp:"post.date | date: '%Y'" %}
    {% for year in posts_by_year %}
      <h2 class="archive-year">{{ year.name }}</h2>
      <ul class="archive-list">
        {% for post in year.items %}
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
      </ul>
    {% endfor %}
  </section>
</div>

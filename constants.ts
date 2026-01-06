import { Project, Post, Social, Experience, BlogPostDetail } from './types';

export const SOCIALS: Social[] = [
  { name: 'Twitter', url: 'https://x.com/Xisisrefliel', icon: 'Twitter' },
  { name: 'GitHub', url: 'https://github.com/Xisisrefliel', icon: 'Github' },
  { name: 'Mail', url: 'mailto:feherlofia@icloud.com', icon: 'Mail' },
];

export const PROJECTS: Project[] = [
  {
    id: '1',
    title: 'Takip',
    description: 'A web app to track Movies and TV Shows',
    tags: ['React', 'Next.js'],
    link: 'https://github.com/Xisisrefliel/takip',
    year: '2024',
    notHostedMessage: 'Not hosted right now'
  },
];

export const POSTS: Post[] = [
  {
    id: '2',
    title: 'Xtream Codes API Quick Reference Guide',
    date: 'Dec 21, 2025',
    readTime: '5 min',
    slug: 'xtream-codes-api-guide'
  }
];

export const EXPERIENCE: Experience[] = [
  {
    role: 'Ausbildung als Anwendungsentwickler',
    company: 'Main-Netz Media',
    period: '2023 - present',
    description: '3 Years of Apprenticeship in Web Development with main focus on Laravel'
  }
];

export const BLOG_POSTS: BlogPostDetail[] = [
  {
    id: '2',
    title: 'Xtream Codes API Quick Reference Guide',
    date: 'Dec 21, 2025',
    readTime: '5 min',
    slug: 'xtream-codes-api-guide',
    dek: 'A comprehensive reference for developers working with Xtream Codes IPTV panels. Because it\'s a pain to find the right information.',
    sections: [
      {
        heading: 'Base URL Format',
        body: 'All requests should be directed to the `player_api.php` endpoint on your provider\'s server:\n\n```\nhttp://SERVER:PORT/player_api.php\n```'
      },
      {
        heading: 'Authentication',
        body: 'All endpoints require `username` and `password` parameters for every request. These are usually provided by your IPTV provider.'
      },
      {
        heading: '1. LIVE TV',
        body: '**Get Categories**\n```http\n**GET** | /player_api.php?username=X&password=X&action=get_live_categories\n```\n\n**Get All Channels**\n```http\n**GET** | /player_api.php?username=X&password=X&action=get_live_streams\n```\n\n**Get Channels by Category**\n```http\n**GET** | /player_api.php?username=X&password=X&action=get_live_streams&category_id=547\n```\n\n**Play a Channel**\n```\nhttp://SERVER:PORT/live/USERNAME/PASSWORD/STREAM_ID.ts\n```'
      },
      {
        heading: '2. VOD (Video on Demand)',
        body: '**Get Categories**\n```http\n**GET** | /player_api.php?username=X&password=X&action=get_vod_categories\n```\n\n**Get All VOD**\n```http\n**GET** | /player_api.php?username=X&password=X&action=get_vod_streams\n```\n\n**Get VOD by Category**\n```http\n**GET** | /player_api.php?username=X&password=X&action=get_vod_streams&category_id=12\n```\n\n**Play a VOD**\n```\nhttp://SERVER:PORT/movie/USERNAME/PASSWORD/STREAM_ID.mp4\n```'
      },
      {
        heading: '3. SERIES (TV Shows)',
        body: '**Get Categories**\n```http\n**GET** | /player_api.php?username=X&password=X&action=get_series_categories\n```\n\n**Get All Series**\n```http\n**GET** | /player_api.php?username=X&password=X&action=get_series\n```\n\n**Get Series by Category**\n```http\n**GET** | /player_api.php?username=X&password=X&action=get_series&category_id=8\n```\n\n**Get Episodes for One Series**\n```http\n**GET** | /player_api.php?username=X&password=X&action=get_series_info&series_id=456\n```\n\n**Play an Episode**\n```\nhttp://SERVER:PORT/series/USERNAME/PASSWORD/EPISODE_ID.mp4\n```'
      },
      {
        heading: '4. EPG (TV Guide)',
        body: '**Short Program Guide (next 4 shows)**\n```http\n**GET** | /player_api.php?username=X&password=X&action=get_short_epg&stream_id=12345\n```\n\n**Full Program Guide for Channel**\n```http\n**GET** | /player_api.php?username=X&password=X&action=get_simple_data_table&stream_id=12345\n```\n\n**Complete EPG (XML format)**\n```http\n**GET** | /xmltv.php?username=X&password=X\n```'
      },
      {
        heading: 'Quick Tips',
        body: '• **Replace** `X` with your actual values\n• **Use GET method** for all requests\n• **Parameters go in URL**, not request body\n• **Stream IDs** come from API responses\n• **Extensions** (.ts, .mp4) must match the `container_extension` field'
      },
      {
        heading: 'Common Issues',
        body: '| Problem | Fix |\n|---------|-----|\n| Getting all streams instead of filtered | Check you\'re using `get_live_streams` not `get_live_categories` |\n| Empty response | Verify category_id exists and has content |\n| "Incorrect credentials" | Check username/password case sensitivity |'
      }
    ],
    outro: 'This guide is based on the standard Xtream Codes API documentation. Always verify specific endpoints with your service provider as some implementations may vary.'
  },
];
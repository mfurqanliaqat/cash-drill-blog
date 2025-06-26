import {
  IconBrandDiscord,
  IconBrandInstagram,
  IconBrandFacebook,
  IconBrandX,
  IconBrandReddit,
  IconBrandYoutube,
  IconBrandTumblr,
} from '@tabler/icons-react'
import React from 'react'
import { Button } from './ui/button'

const socialLinks = [
  {
    icon: IconBrandX,
    href: 'https://x.com/yourusername',
  },
  {
    icon: IconBrandFacebook,
    href: 'https://facebook.com/yourusername',
  },
  {
    icon: IconBrandInstagram,
    href: 'https://instagram.com/yourusername',
  },
  {
    icon: IconBrandReddit,
    href: 'https://reddit.com/yourusername',
  },
  {
    icon: IconBrandDiscord,
    href: 'https://discord.com/yourusername',
  },
  {
    icon: IconBrandYoutube,
    href: 'https://youtube.com/yourusername',
  },
  {
    icon: IconBrandTumblr,
    href: 'https://tumblr.com/yourusername',
  },
]

function BlogSocialLinks() {
  return (
    <div className='flex gap-4 w-full flex-wrap items-center justify-center'>
      {socialLinks.map(link => (
        <Button variant='outline' size='icon' key={link.href}>
          <link.icon />
        </Button>
      ))}
    </div>
  )
}

export default BlogSocialLinks

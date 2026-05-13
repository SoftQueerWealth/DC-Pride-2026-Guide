import { AtSign, Instagram, Link2, Mail } from 'lucide-react';
import { SocialPlatform, trackSocialClick } from '../lib/analytics';

const SOCIAL = [
  {
    platform: SocialPlatform.Instagram,
    href: 'https://www.instagram.com/softqueerwealth?igsh=NzVzaWt4N3BseDQ5',
    label: 'Instagram',
    Icon: Instagram,
  },
  {
    platform: SocialPlatform.Threads,
    href: 'https://www.threads.com/@softqueerwealth',
    label: 'Threads',
    Icon: AtSign,
  },
  {
    platform: SocialPlatform.Linktree,
    href: 'https://linktr.ee/softqueerwealth?utm_source=ig&utm_medium=social&utm_content=link_in_bio',
    label: 'Linktree',
    Icon: Link2,
  },
  {
    platform: SocialPlatform.Email,
    href: 'mailto:SoftQueerWealth@gmail.com',
    label: 'Email Soft Queer Wealth',
    Icon: Mail,
  },
] as const;

export function HeroSocial() {
  return (
    <div className="hero-social" aria-label="Soft Queer Wealth links">
      {SOCIAL.map(({ platform, href, label, Icon }) => (
        <a
          key={platform}
          href={href}
          target={href.startsWith('mailto:') ? undefined : '_blank'}
          rel={href.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
          aria-label={label}
          onClick={() => trackSocialClick(platform, href)}
        >
          <Icon size={19} aria-hidden />
        </a>
      ))}
    </div>
  );
}

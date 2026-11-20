import type { IconName } from '../../components/Icon/Icon';

export interface ContactLink {
    platform: IconName
    text: string
    href: string
}

const contact: ContactLink[] = [
    {
        platform: 'email',
        text: 'hello@tuckbick.com',
        href: 'mailto:hello@tuckbick.com?subject=Hey%20there!'
    },
    {
        platform: 'github',
        text: 'github.com/tuckbick',
        href: 'https://github.com/tuckbick'
    },
    {
        platform: 'linkedin',
        text: 'linkedin.com/in/tuckbick',
        href: 'https://www.linkedin.com/in/tuckbick/'
    },
    {
        platform: 'twitter',
        text: 'twitter.com/tuckbick',
        href: 'https://twitter.com/tuckbick',
    },
    {
        platform: 'facebook',
        text: 'facebook.com/tuckbick',
        href: 'https://www.facebook.com/tuckbick'
    }
];

export default contact;

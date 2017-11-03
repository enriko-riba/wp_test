import { LinkItem } from "./LinkItem";

/**
 * defines ppplication links (urls)
 */
export const links : Array<LinkItem> = [ 
    new LinkItem('/#/home', 'Home', 'page-home', true),
    new LinkItem('/#/about', 'About', 'page-about'),
    new LinkItem('/#/usage', 'Usage', 'page-usage'),
    new LinkItem('/#/search', 'Module finder', 'page-search'),
    new LinkItem('/#/events', 'Events', 'page-events'),
    new LinkItem('/#/services', 'Services', 'page-services'),
    new LinkItem('/#/contact', 'Contact', 'page-contact')
] ;  
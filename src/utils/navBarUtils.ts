interface pageType{
    name : string,
    path : string
}

export const PageLinks : Array<pageType> = [
    {
        name : 'Home',
        path : '/'
    },
    {
        name : 'Events',
        path : '/events'
    },
    {
        name : 'Workshops',
        path : '/workshops'
    },
    {
        name : 'Sessions',
        path : '/sessions'
    },
    {
        name : 'Contact',
        path : '/contact'
    }
]
export type ActiveTabType = {
    page : string,
    isActive : boolean
}

export const defaultActiveTab : ActiveTabType[] =  [
    {page : 'Explorer', isActive : true},
    {page : 'Team', isActive : false},
    {page : 'Events', isActive : false}
]

export const changeActiveTab = (
    activeTabs : ActiveTabType[], 
    tabName : string,
    setShowExplorer?: React.Dispatch<React.SetStateAction<boolean>>
) : ActiveTabType[] => {

    if(setShowExplorer)
        setShowExplorer(true)

    return activeTabs.map((tab) => {
        if(tab.page === tabName){
            return {
                ...tab,
                isActive : true
            }
        }
        else{
            return{
                ...tab,
                isActive : false
            }
        }
    })
}

export type Page = {
    name: string;
    path: string;
    icon : React.ReactNode
};

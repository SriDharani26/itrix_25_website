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


export const domains = [
  { name: "Staff", path: "#staff" },
  { name: "Core", path: "#core" },
  { name: "Coordinators", path: "#coordinators" },
  { name: "Events", path: "#events" },
  { name: "Marketing and Media", path: "#marketing-and-media" },
  { name: "Design", path: "#design" },
  { name: "External Relations", path: "#external-relations" },
  { name: "Web development", path: "#web-development" },
  { name: "Contents", path: "#contents" },
  { name: "Logistics", path: "#logistics" },
  { name: "Courses", path: "#courses" },
  { name: "Placement Training Coordinators", path: "#placement-training-coordinators" },
  { name: "Internship Training Coordinators", path: "#internship-training-coordinators" },
];
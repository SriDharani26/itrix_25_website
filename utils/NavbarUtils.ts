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

type domainsTpye = {
    name : string,
    path : string
}
export const domains : Array<domainsTpye> = [
  { name: "Staff", path: "#staff" },
  { name: "Core", path: "#core" },
  { name: "Deputy Coordinators", path: "#coordinators" },
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

type hoverCardContentType = {
    domainName : string,
    totalCount : number,
    head ?: number,
    associates ?: number,
    deputies ?: number
}

export const domainDetails: Array<hoverCardContentType> = [
  { domainName: "Staff Coordinates", totalCount: 2 },
  { domainName: "Core", totalCount: 3},
  { domainName: "Deputy Coordinators", totalCount: 3},
  { domainName: "Events", totalCount: 0, head: 0, associates: 0, deputies: 0 },
  { domainName: "Marketing and Media", totalCount: 0, head: 0, associates: 0, deputies: 0 },
  { domainName: "Design", totalCount: 0, head: 1, associates: 1, deputies: 1 },
  { domainName: "External Relations", totalCount: 0, head: 0, associates: 0, deputies: 0 },
  { domainName: "Web development", totalCount: 0, head: 0, associates: 0, deputies: 0 },
  { domainName: "Contents", totalCount: 0, head: 0, associates: 0, deputies: 0 },
  { domainName: "Logistics", totalCount: 0, head: 0, associates: 0, deputies: 0 },
  { domainName: "Courses", totalCount: 0, head: 0, associates: 0, deputies: 0 },
  { domainName: "Placement Training Coordinators", totalCount: 0, head: 0, associates: 0, deputies: 0 },
  { domainName: "Internship Training Coordinators", totalCount: 0, head: 0, associates: 0, deputies: 0 },
];
export const sortByDate=(notes,sortBy)=>{
    const notesCopy=[...notes];
   if(sortBy==='latest'){
          notesCopy.sort((a,b)=>a.date-b.date)
   }else{
    notesCopy.sort((a,b)=>b.date-a.date)
   }
   return [...notesCopy]
}
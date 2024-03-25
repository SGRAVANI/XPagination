import React, { useEffect, useState } from 'react'
import styles from "./style.module.css"
export default function Pagination() {
let [data,setData]=useState([])
let [page,setPage]=useState(0)
let [index,setIndex]=useState(0)
   async  function fetchData()
{

try{
let response= await fetch('https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json')
let data=await response.json()
if(data.length>0)
{
    setPage(1);
}
console.log(data)
setData(data)
}
catch(e)
{
    console.error(e)
}
}
useEffect(()=>{
fetchData()
},[])
// function handleNext()
// {   let pageData;
//     if (data.length > index) {
//         if (index + 10 < data.length) {
//             pageData = data.slice(index, index + 10); // Corrected slicing logic
//         } else {
//             pageData = data.slice(index, data.length);
//         }

//         setIndex(prev => {
//             if (prev + 10 < data.length) {
//                 return prev + 10;
//             } else {
//                 return data.length;
//             }
//         });

//         setPage(prev => prev + 1); // Update page number

//         return generateData(pageData); // Return the generated data
//     }
//     else{
//         return null;}
// }
// function generateData(partialData)
// {
//     let list=partialData.map((ele,index)=>{
//         return (<tr className={styles.tr} key={ele.id}><td >{ele.id}</td><td>{ele.name}</td><td>{ele.email}</td><td>{ele.role}</td></tr>)
//     })
//     return list;
// }
function handleNext() {
    if(index<=data.length && index+10<=data.length )
    {
    if (data.length > index) {
        if (index + 10 < data.length) {
            setIndex(prev => prev + 10);
        } else {
            setIndex(data.length);
        }
        setPage(prev => prev + 1);
    }
}
}

function generateData(partialData) {
    return partialData.map((ele, index) => (
        <tr className={styles.tr} key={ele.id}>
            <td>{ele.id}</td>
            <td>{ele.name}</td>
            <td>{ele.email}</td>
            <td>{ele.role}</td>
        </tr>
    ));
}
function handlePrev()
{   if(index>=10)
    {
     setIndex((prev)=>prev-10)
     setPage((prev)=>prev-1)
    // if(data.length-index<10)
    // {
    //     setIndex((prev)=>data.length-prev)
    // } 
    // else{
    //     setIndex()
    // }

    //}
   }
}
    return (
    <div className={styles.container}>
        <h1>Employee Data Table</h1>
        <table className={styles.tableContainer}>
            <thead>
            <tr className={styles.tr}>
                <th className={styles.tableHeading}>
                 Id
                </th>
                <th className={styles.tableHeading}>
                 Name
                </th>

                <th className={styles.tableHeading}>
                 Email
                </th> 
                <th className={styles.tableHeading}>
                 Role
                </th>
                </tr>
                </thead>
                <tbody>
                 {generateData(data.slice(index, index + 10))}
                </tbody>
        </table>
        <div className={styles.bthContainer}>
            <button onClick={handlePrev}>Previous</button>
            <div>{page}</div>
            <button onClick={handleNext}>Next</button>
        </div>
    </div>
  )
}

// import { STATUS_CODES } from "http";
// import { endianness } from "os";

//GET all user for login verification 

let get_all_users=()=>{
    return axios.get('https://still-inlet-89790.herokuapp.com/users').then((res)=>{
        console.log(res.data)
        return res.data
    })
}

//GET all driver for passenger
get_all_driver=()=>{
    return axios.get('https://still-inlet-89790.herokuapp.com/drivers').then((res)=>{
        console.log(res.data)
        return res.data
    })
}

let getDriver=(lap,lop,namep,pnumberp,fromp,top)=>{
    get_all_driver().then((doc)=>{
        let drive = doc;

        drive.forEach((vald,ind)=>{
            let lad= vald.latitude;
            let lod = vald.longitude;
            console.log("driver ka",lad,lod)
            console.log("passenger ka",lap,lop)
            if (lap<=lad+1 && lap>=lad-1 && lop<=lod+1 && lop>=lod-1)
            {

                let new_div = document.getElementById('a_driver');

                new_div.innerHTML+=`<div style="border: solid 5px; box-shadow: 6px 6px 0px rgb(22, 27, 105); border-radius: 5px; width: 26%; margin-left: 8%;margin-bottom: 1% ; padding-right:3%; padding-left:6%; padding-top:1%; padding-bottom:1%; ">
                                        <h5>Name: ${vald.name}</h5>
                                        <h6>Phone No: ${vald.pnumber}</h6>
                                        <h6>Car Name : ${vald.cname}</h6>
                                        <h6>Carnumber: ${vald.cnum}</h6>
                                        <h6>From:${vald.from}  -> To: ${vald.to} 
                                        <button class="req_drive">Request</button>
                                    </div>`

                document.querySelector('.req_drive').addEventListener('click',(e)=>{
                    let new_request={
                        namep:namep,
                        named:vald.name,
                        pnumberp:pnumberp,
                        pnumberd:vald.pnumber
                    }
                    axios.post('https://still-inlet-89790.herokuapp.com/requests',JSON.stringify(new_request),{
                        headers:{
                            'Content-type':'application/json'
                        }
                    }).then((doc)=>{
                        alert("Your Request has been send succefully !!!")
                    })
                })
            }
        })

        
    })
}

// ......................checked................

if(window.location.pathname.substring(window.location.pathname.lastIndexOf("/") + 1)=="after_driver.html"){
    console.log("we are here")
    axios.get('https://still-inlet-89790.herokuapp.com/requests').then((res)=>{
        let data=res.data
        console.log(data)
        let pnumps=[]
        data.forEach((val,ind)=>{
            console.log("HIscnajna")
            if(val.pnumberd == localStorage.getItem('unite_pnum')){
                pnumps.push(val.pnumberp)
            }
        })
        console.log(pnumps)
        axios.get('https://still-inlet-89790.herokuapp.com/passengers').then((res)=>{
            let pass=res.data
            console.log(pass)
            pass.forEach((val,ind)=>{
                if(pnumps.indexOf(val.pnumber)>-1){
                    sendDriver(val.name,val.pnumber,val.from,val.to,localStorage.getItem('unite_pnum'),localStorage.getItem('unite_name'),"hello")
                }
            })
        })
    })
    // sendDriver(namep,pnumberp,fromp,top,pnumberd,named,"")
}

//Driver to accept the request send by passenger 

let sendDriver=(namep,pnumberp,fromp,top,pnumberd,named,emaild)=>{
    get_all_driver().then((res)=>{
        let driver = res
        console.log("HIIIII")
        driver.forEach((val,ind)=>{
            if (Number(val.pnumber) === Number(pnumberd)){                      //aaiya check kar k val.type= driver possible che k nai atariya to hatai didhu che 
                    let new_div = document.getElementById('show_driver');
                    console.log("hi")
                    new_div.innerHTML+=`<div style="border: solid 5px; box-shadow: 6px 6px 0px rgb(22, 27, 105); border-radius: 5px; width: 26%; margin-left: 8%;margin-bottom: 1% ; padding-right:3%; padding-left:6%; padding-top:1%; padding-bottom:1%; ">
                                        <h5>Name: ${namep}</h5>
                                        <h6>Phone No: ${pnumberp}</h6>
                                        <h6>From:${fromp}  -> To: ${top} 
                                        <button class="accept_driver">Accept</button>
                                    </div>`
                    
                    document.querySelector('.accept_driver').addEventListener('click',(e)=>{
                        alert("You have Accepted the request and He/She is added to you car");
                        this.disabled=true;

                        
                        let addin = {namep:namep,pnumberp:Number(pnumberp),named:named,pnumberd:Number(pnumberd),emaild:emaild};
                        
                        //groupInCar(namep,pnumberp,pnumberd,named)

                        console.log(addin)
                        
                        axios.post('https://still-inlet-89790.herokuapp.com/groups',addin,{
                                headers:{
                                    'Content-type':'application/json'
                                }
                            }).then((res)=>{
                                window.location.href = "inner.html"
                            })            
                })
            }
            
        })
    })
}

// making group in car 

// let drc = 0;

// let groupInCar=(namep,pnumberp,pnumberd,named) =>{

//     post_group

//      get_all_users.then((docs)=>{
//          let user = docs.user
//          document.querySelector('#group_b').addEventListener(('click'),(e)=>{
//              user.forEach((val,ind)=>{
//                  if (drc===0){
//                     let new_div = document.getElementById('#group');
//                     new_div.innerHTML=`<div style="border: solid 5px; box-shadow: 6px 6px 0px rgb(22, 27, 105); border-radius: 5px; width: 28%; margin-left: 8%;margin-bottom: 1% ; padding-right:1%; padding-left:2%;  padding-bottom:0.5%; ">
//                                         <h5>Owner</h5>    
//                                         <h6>Name: ${named} , Phone No: ${pnumberd}</h6>     
//                                     </div>
//                                     <div style="border: solid 5px; box-shadow: 6px 6px 0px rgb(22, 27, 105); border-radius: 5px; width: 28%; margin-left: 8%;margin-bottom: 1% ; padding-right:1%; padding-left:2%;  padding-bottom:0.5%; ">
//                                         <h5>Passenger</h5>    
//                                         <h6>Name: ${namep} , Phone No: ${pnumberp}</h6>     
//                                     </div>`
//                  }
                 
//             })
//          })
//      })
// }


//get groups 

let get_group= () =>{
    return axios.get('https://still-inlet-89790.herokuapp.com/groups').then((res)=>{
        console.log(res.data)
        return res.data
    })
}

//making change in balance 

// let changeBalance = (pnum, cahnge) =>{
//     get_all_users().then((docs)=>{
//         let use = docs.users
//         use.forEach((val,ind)=>{
//             if (val.pnumber === pnum){
//                 val.balance=change
//             }
//         })
//     })
// } 

let dr = document.querySelector('#driver_b')
let pa = document.querySelector('#passenger_b')

dr && dr.addEventListener('click',(e)=>{
    window.location.href = "drive.html";
})

pa && pa.addEventListener('click',(e)=>{
    window.location.href = "passenger.html";
})


document.querySelector('#drive_r_b') && document.querySelector('#drive_r_b').addEventListener('click',(e)=>{
    let fromd = document.querySelector('#fromd').value
    let tod = document.querySelector('#tod').value
    let cnum = document.querySelector('#cnum').value
    let cname = document.querySelector('#cname').value
    let timed = document.querySelector('#timed').value
    let ms = document.querySelector('#maxs').value
    let latituded
    let longituded
    
    if (!navigator.geolocation){
        return alert('Location option not there.');
    }
    else {
        navigator.geolocation.getCurrentPosition(function(position){
            latituded = position.coords.latitude
            longituded = position.coords.longitude
            console.log(latituded,longituded)

            let user_name=localStorage.getItem('unite_name')
            let user_pnum=localStorage.getItem('unite_pnum')

            let newdr= {name:user_name, pnumber:Number(user_pnum),from:fromd,to:tod,cnum:cnum,cname:cname,time:timed,maxs:Number(ms),latitude:latituded,longitude:longituded}
            //POSTing driver request
            console.log(newdr)

    axios.post(`https://still-inlet-89790.herokuapp.com/drivers`,JSON.stringify(newdr),{
            headers:{
                'Content-type':'application/json'
            }
        }).then((res)=>{
            window.location.href="inner.html"
    })

        },function(){
            alert('Not able to fetch your location')
        })
    }
})


document.querySelector('#passenger_r_b') && document.querySelector('#passenger_r_b').addEventListener('click',(e)=>{
    let fromp = document.querySelector('#fromp').value
    let top = document.querySelector('#top').value
    let timep = document.querySelector('#timep').value
    let latitudep
    let longitudep

    if (!navigator.geolocation){
        return alert('Not able to featch your location, so we are taking your manual location');
    }
    else {
        navigator.geolocation.getCurrentPosition(function(position){
            latitudep = position.coords.latitude
            longitudep = position.coords.longitude
            console.log(latitudep,longitudep)

            let user_name=localStorage.getItem('unite_name')
            let user_pnum=localStorage.getItem('unite_pnum')

            let newpa= {name:user_name, pnumber:Number(user_pnum),from:fromp,to:top,time:timep,latitude:latitudep,longitude:longitudep}

            //POSTing passenger request

            console.log(newpa)
            axios.post('https://still-inlet-89790.herokuapp.com/passengers',JSON.stringify(newpa),{
                headers:{
                    'Content-type':'application/json'
                }
            }).then((docs)=>{
                localStorage.setItem('from',newpa.from)
                localStorage.setItem('to',newpa.to)
                localStorage.setItem('latitudep',newpa.latitude)
                localStorage.setItem('longitudep',newpa.longitude)
            window.location.href="after_passenger.html"
        })
        },function(){
            alert('Not able to featch your location, so we are taking your manual location')
        })
    }

})

if(window.location.pathname.substring(window.location.pathname.lastIndexOf("/") + 1)=="after_passenger.html"){
    let name=localStorage.getItem('unite_name')
    let pno=Number(localStorage.getItem('unite_pnum'))
    let from=localStorage.getItem('from')
    let to=localStorage.getItem('to')
    let lat=localStorage.getItem('latitudep')
    let lon=localStorage.getItem('longitudep')
    getDriver(lat,lon,name,pno,from,to)
}

// ................Start.........................



if(window.location.pathname.substring(window.location.pathname.lastIndexOf("/") + 1)=="group.html"){
    get_group().then((docs)=>{
        let pair = docs;
        pair.forEach((val,ind)=>{
            if (Number(val.pnumberd) == localStorage.getItem("unite_pnum"))
            {
                let new_div = document.getElementById('groupd');

                new_div.innerHTML=`<div style="border: solid 5px; box-shadow: 6px 6px 0px rgb(22, 27, 105); border-radius: 5px; width: 26%; margin-left: 8%;margin-bottom: 1% ; padding-right:3%; padding-left:6%; padding-top:1%; padding-bottom:1%; ">
                                        <h5>Name: ${val.named}</h5>
                                        <h6>Phone No: ${val.pnumberd}</h6>
                                    </div>`
                axios.get('https://still-inlet-89790.herokuapp.com/passengers').then((res)=>{
                    let pass=res.data
                    console.log(pass)
                    pass.forEach((valp,ind)=>{
                        if(Number(valp.pnumber) === Number(val.pnumberp)){
                            let new_div = document.getElementById('groupp');

                            new_div.innerHTML=`<div style="border: solid 5px; box-shadow: 6px 6px 0px rgb(22, 27, 105); border-radius: 5px; width: 26%; margin-left: 8%;margin-bottom: 1% ; padding-right:3%; padding-left:6%; padding-top:1%; padding-bottom:1%; ">
                                                    <h5>Name: ${val.namep}</h5>
                                                    <h6>Phone No: ${val.pnumberp}</h6>
                                                </div>` 
                        }
                    })
                })
            }
            else if(Number(val.pnumberp) == Number(localStorage.getItem("unite_pnum"))) 
            {
                if (val.pnumberd)
                {
                    let new_div = document.getElementById('groupd');

                    new_div.innerHTML=`<div style="border: solid 5px; box-shadow: 6px 6px 0px rgb(22, 27, 105); border-radius: 5px; width: 26%; margin-left: 8%;margin-bottom: 1% ; padding-right:3%; padding-left:6%; padding-top:1%; padding-bottom:1%; ">
                                            <h5>Name: ${val.named}</h5>
                                            <h6>Phone No: ${val.pnumberd}</h6>
                                        </div>`
                    axios.get('https://still-inlet-89790.herokuapp.com/passengers').then((res)=>{
                        let pass=res.data
                        console.log(pass)
                        pass.forEach((valp,ind)=>{
                            if(Number(valp.pnumber) === Number(val.pnumberp)){
                                let new_div = document.getElementById('groupp');

                                new_div.innerHTML=`<div style="border: solid 5px; box-shadow: 6px 6px 0px rgb(22, 27, 105); border-radius: 5px; width: 26%; margin-left: 8%;margin-bottom: 1% ; padding-right:3%; padding-left:6%; padding-top:1%; padding-bottom:1%; ">
                                                        <h5>Name: ${val.namep}</h5>
                                                        <h6>Phone No: ${val.pnumberp}</h6>
                                                    </div>` 
                        }
                    })
                })
                }
            }
            else{
                alert("No Group Is Formed Yet; Please Make Group")
            }
        })
    })

    get_all_users().then((doc)=>{
        let userg = doc

        userg.forEach((valse,ind)=>{
            if (Number(valse.pnumber)== localStorage.getItem("unite_pnum"))
            {
                let latitudee
                let longitudee
                let latitudes
                let longitudes
                document.getElementById('startj').addEventListener('click',(e)=>{
                                   
                                    
                    if (!navigator.geolocation){
                        return alert('Location feature not available ');
                    }
                    else {
                        navigator.geolocation.getCurrentPosition(function(position){
                            latitudes = position.coords.latitude
                            longitudes = position.coords.longitude
                            console.log(latitudes,longitudes)
                            alert('your journey has started')
                        },function(){
                            alert('Not able to featch your location, so we are taking your manual location')
                        })
                    }
            
                    
                })

                document.getElementById('endj').addEventListener('click',(e)=>{
                                   
                                    
                    if (!navigator.geolocation){
                        return alert('Not able to featch your location, so we are taking your manual location');
                    }
                    else {
                        navigator.geolocation.getCurrentPosition(function(position){
                            latitudee = position.coords.latitude
                            longitudee = position.coords.longitude
                            console.log(latitudee,longitudee)
                            let dla= Math.abs(latitudes-latitudee);
                    let dlo= Math.abs(longitudes-longitudee);
                    let dis= Math.sqrt((dla*dla)+(dlo*dlo))
                                        
                    let cost=dis*350;
                    valse.balance= parseFloat(valse.balance)-cost;

                    axios.post('https://still-inlet-89790.herokuapp.com/users_balance',{pnumber:localStorage.getItem("unite_pnum"), balance: valse.balance.toString()},{
                        headers:{
                            'Content-Type':'application/json'
                        }
                    }).then((res)=>{
                        console.log(res)
                    }).catch((err)=>{
                        console.log("cjhac")
                    })
                    alert(`your journey has ended, total cost of your journey is ${cost}`)
                        },function(){
                            alert('Not able to featch your location, so we are taking your manual location')
                        })
                    }
                    
                })
            }
        })
    })
 
}

// BALANCE 

if(window.location.pathname.substring(window.location.pathname.lastIndexOf("/") + 1)=="balance.html"){
    get_all_users().then((doc)=>{
        let userb = doc
        userb.forEach((valb,ind)=>{
            if(Number(valb.pnumber)=== Number(localStorage.getItem("unite_pnum"))) 
            {
                let curr= document.getElementById('curr_balance')
                let mon= document.getElementById('add_balance')
                curr.textContent= valb.balance
                document.getElementById('add_100').addEventListener('click',(e)=>{
                    console.log('asdasdasdasdasdasdasdasdasdasdasdasdasdasd')
                    let ncurr= parseInt(curr.textContent);
                    ncurr =ncurr + 100;
                    curr.textContent= ncurr;
                    valb.balance=ncurr
                    //changeBalance(val.pnumber,100)
                    curr.textContent= valb.balance
                console.log({pnumber:localStorage.getItem("unite_pnum").toString(), balance: valb.balance.toString()})
                axios.post('https://still-inlet-89790.herokuapp.com/users_balance',{pnumber:localStorage.getItem("unite_pnum").toString(), balance: valb.balance.toString()},{
                    headers:{
                        'Content-type':'application/json'
                    }
                })
                })
                document.getElementById('add_500').addEventListener('click',(e)=>{
                    let ncurr= parseInt(curr.textContent);
                    ncurr =ncurr + 500;
                    curr.textContent= ncurr;
                    valb.balance=ncurr
                    //changeBalance(val.pnumber,500)
                    curr.textContent= valb.balance
                console.log({pnumber:localStorage.getItem("unite_pnum").toString(), balance: valb.balance.toString()})
                axios.post('https://still-inlet-89790.herokuapp.com/users_balance',{pnumber:localStorage.getItem("unite_pnum").toString(), balance: valb.balance.toString()},{
                    headers:{
                        'Content-type':'application/json'
                    }
                })
                })
                document.getElementById('add_1000').addEventListener('click',(e)=>{
                    let ncurr= parseInt(curr.textContent);
                    ncurr =ncurr + 1000;
                    curr.textContent= ncurr;
                    valb.balance=ncurr
                    //changeBalance(val.pnumber,1000)
                    curr.textContent= valb.balance
                console.log({pnumber:localStorage.getItem("unite_pnum").toString(), balance: valb.balance.toString()})
                axios.post('https://still-inlet-89790.herokuapp.com/users_balance',{pnumber:localStorage.getItem("unite_pnum").toString(), balance: valb.balance.toString()},{
                    headers:{
                        'Content-type':'application/json'
                    }
                })
                })
                document.getElementById('driver_b_add').addEventListener('click',(e)=>{
                    let ncurr= parseInt(curr.textContent);
                    ncurr =ncurr + parseInt(mon.value);
                    curr.textContent= ncurr;
                    valb.balance=ncurr
                    //changeBalance(val.pnumber,mon.value)
                    curr.textContent= valb.balance
                console.log({pnumber:localStorage.getItem("unite_pnum").toString(), balance: valb.balance.toString()})
                axios.post('https://still-inlet-89790.herokuapp.com/users_balance',{pnumber:localStorage.getItem("unite_pnum").toString(), balance: valb.balance.toString()},{
                    headers:{
                        'Content-type':'application/json'
                    }
                })
                })
                
                curr.textContent= valb.balance
                console.log({pnumber:localStorage.getItem("unite_pnum").toString(), balance: valb.balance.toString()})
                axios.post('https://still-inlet-89790.herokuapp.com/users_balance',{pnumber:localStorage.getItem("unite_pnum").toString(), balance: valb.balance.toString()},{
                    headers:{
                        'Content-type':'application/json'
                    }
                })
            }
        })

    })
    
}
// .....................end........,,,,,,,,,,,,,,,,,,,,,,,,,,

document.querySelector('#login_b') && document.querySelector('#login_b').addEventListener('click',(e)=>{
    let flag=0
    console.log("you clicked")
    get_all_users().then((doc) => {
        console.log(doc)
        console.log("bhaiya ji mil gaya",doc)
        let user=doc
        let u = document.querySelector('#emaill').value
        let p = document.querySelector('#passwordl').value
        
        user.forEach((val, ind) => {
            if (val.email === u && val.password === p ) {
                flag = 1
                
                let user_name =val.first_Name +' '+ val.last_Name 
                let user_pnum = val.pnumber

                localStorage.setItem('unite_name',user_name)
                localStorage.setItem('unite_pnum',user_pnum)

                window.location.href = "inner.html";

                // document.querySelector('#group_b').addEventListener('click',(e)=>{
                //     let drc = 0;
                //     windows.location.href="group.html";
                //     get_group().then((docs)=>{
                //         let gp = docs.groups;
                //         gp.forEach((valg,indx)=>{
                //             if (val.pnumber === valg.pnumberd || val.pnumber === valg.pnumberp){
                //                 if(drc===0){
                //                     drc=1;
                                                                        
                //                     let new_div = document.getElementById('group');
                //                     new_div.innerHTML=`<div style="border: solid 5px; box-shadow: 6px 6px 0px rgb(22, 27, 105); border-radius: 5px; width: 28%; margin-left: 8%;margin-bottom: 1% ; padding-right:1%; padding-left:2%;  padding-bottom:0.5%; ">
                //                                         <h5>Owner</h5>    
                //                                         <h6>Name: ${named} , Phone No: ${pnumberd}</h6>     
                //                                     </div>
                //                                     <div style="border: solid 5px; box-shadow: 6px 6px 0px rgb(22, 27, 105); border-radius: 5px; width: 28%; margin-left: 8%;margin-bottom: 1% ; padding-right:1%; padding-left:2%;  padding-bottom:0.5%; ">
                //                                         <h5>Passenger</h5>    
                //                                         <h6>Name: ${namep} , Phone No: ${pnumberp}</h6>     
                //                                     </div>`
                //                 }
                //                 else {
                //                     let new_div = document.getElementById('#group');
                //                     new_div.innerHTML=`<div style="border: solid 5px; box-shadow: 6px 6px 0px rgb(22, 27, 105); border-radius: 5px; width: 28%; margin-left: 8%;margin-bottom: 1% ; padding-right:1%; padding-left:2%;  padding-bottom:0.5%; ">
                //                                         <h5>Passenger</h5>    
                //                                         <h6>Name: ${namep} , Phone No: ${pnumberp}</h6>     
                //                                     </div>`
                //                 }

                //                 let latitudee
                //                 let longitudee
                //                 let latitudes
                //                 let longitudes
                                
                //                 document.getElementById('startj').addEventListener('click',(e)=>{
                                   
                                    
                //                     if (!navigator.location){
                //                         return aletr('Not able to featch your location, so we are taking your manual location');
                //                     }
                //                     else {
                //                         navigator.geolocation.getCurrentPosition(function(position){
                //                             latitudes = position.coords.latitude
                //                             longitudes = position.coords.longitude
                //                             console.log(latitude,longitude)
                //                         },function(){
                //                             alert('Not able to featch your location, so we are taking your manual location')
                //                         })
                //                     }

                //                     alert('your journey has started')
                //                 })
                //                 document.getElementById('endj').addEventListener('click',(e)=>{
                                   
                                    
                //                     if (!navigator.location){
                //                         return aletr('Not able to featch your location, so we are taking your manual location');
                //                     }
                //                     else {
                //                         navigator.geolocation.getCurrentPosition(function(position){
                //                             latitudee = position.coords.latitude
                //                             longitudee = position.coords.longitude
                //                             console.log(latitude,longitude)
                //                         },function(){
                //                             alert('Not able to featch your location, so we are taking your manual location')
                //                         })
                //                     }
                //                     let dla= Math.abs(latitudes-latitudee);
                //                     let dlo= Math.abs(longitudes-longitudee);
                //                     let dis= Math.sqrt((dla*dla)+(dlo*dlo))
                                    
                //                     if (val.pnumber===valg.pnumberd){
                //                         let cost=dis*250;
                //                         val.balance= parseFloat(val.balance)-cost;
                //                     }
                //                     else {
                //                         let cost=dis*350;
                //                         val.balance= parseFloat(val.balance)-cost;
                //                     }

                //                     alert(`your journey has ended, total cost of your journey is ${cost}`)
                //                 })
                                
                                
                                
                                
                //             }
                //         })
                //     })
                // })

                // //balace change karva mate 

                // document.querySelector('#balance').addEventListener('click',(e)=>{
                //     let curr= document.getElementById('curr_balance')
                //     let mon= document.getElementById('add_balance')
                //     curr.textContent= val.balance
                //     document.getElementById('add_100').addEventListener('click',(e)=>{
                //         let ncurr= parseInt(curr.textContent);
                //         ncurr =ncurr + 100;
                //         curr.textContent= ncurr;
                //         val.balance=ncurr
                //         //changeBalance(val.pnumber,100)

                //     })
                //     document.getElementById('add_500').addEventListener('click',(e)=>{
                //         let ncurr= parseInt(curr.textContent);
                //         ncurr =ncurr + 500;
                //         curr.textContent= ncurr;
                //         val.balance=ncurr
                //         //changeBalance(val.pnumber,500)
                //     })
                //     document.getElementById('add_1000').addEventListener('click',(e)=>{
                //         let ncurr= parseInt(curr.textContent);
                //         ncurr =ncurr + 1000;
                //         curr.textContent= ncurr;
                //         val.balance=ncurr
                //         //changeBalance(val.pnumber,1000)
                //     })
                //     document.getElementById('driver_b').addEventListener('click',(e)=>{
                //         let ncurr= parseInt(curr.textContent);
                //         ncurr =ncurr + parseInt(mon.value);
                //         curr.textContent= ncurr;
                //         val.balance=ncurr
                //         //changeBalance(val.pnumber,mon.value)
                //     })
                //     curr.textContent= val.balance

                // })
            }
        })
        if (flag === 0) {
            alert("You don't have an account. Please sign up.")
        }
    })
})

if(window.location.pathname.substring(window.location.pathname.lastIndexOf("/") + 1)=="check.html"){
    document.querySelector('#search_daily').addEventListener('click',()=>{
        axios.get('https://rocky-atoll-55276.herokuapp.com/daily').then((res)=>{
        let data=res.data[0]
        console.log(data)
        let from_place=document.querySelector('#from_place').value
        let to_place=document.querySelector('#to_place').value

        data.bus.forEach((val,ind)=>{
            console.log("heelo hi")
            if(val.from==from_place && val.to==to_place){
                document.querySelector('#daily_bus').innerHTML+=`<div style="border: solid 5px; box-shadow: 6px 6px 0px rgb(22, 27, 105); border-radius: 5px; width: 100%; margin-left: 8%;margin-bottom: 1% ; padding-right:3%; padding-left:6%; padding-top:1%; padding-bottom:1%; ">
                <h5>Name: ${val.name}</h5>
                <h6>From: ${val.from}</h6>
                <h6>To: ${val.to}</h6>
                <h6>Time: ${val.time} </h6>
                <h6>Station: ${val.station}</h6>
                <h6>Cost: 250</h6>`
                // document.querySelector('.buy_ticket').addEventListener('click',(e)=>{
                //         alert("250 has been deducted from your account");
                //         this.disabled=true;
                }
        })

        data.train.forEach((val,ind)=>{
            console.log("heelo hi")
            if(val.from==from_place && val.to==to_place){
                document.querySelector('#daily_train').innerHTML+=`<div style="border: solid 5px; box-shadow: 6px 6px 0px rgb(22, 27, 105); border-radius: 5px; width: 100%; margin-left: 8%;margin-bottom: 1% ; padding-right:3%; padding-left:6%; padding-top:1%; padding-bottom:1%; ">
                <h5>Name: ${val.name}</h5>
                <h6>From: ${val.from}</h6>
                <h6>To: ${val.to}</h6>
                <h6>Time: ${val.time} </h6>
                <h6>Station: ${val.station}</h6>
                <h6>Cost: 150</h6>`
                
                // document.querySelector('.buy_tickett').addEventListener('click',(e)=>{
                        // alert("150 has been deducted from your account");
                        // this.disabled=true;
            }
        })

        data.metro.forEach((val,ind)=>{
            console.log("heelo hi")
            if(val.from==from_place && val.to==to_place){
                document.querySelector('#daily_metro').innerHTML+=`<div style="border: solid 5px; box-shadow: 6px 6px 0px rgb(22, 27, 105); border-radius: 5px; width: 100%; margin-left: 8%;margin-bottom: 1% ; padding-right:3%; padding-left:6%; padding-top:1%; padding-bottom:1%; ">
                <h5>Name: ${val.name}</h5>
                <h6>From: ${val.from}</h6>
                <h6>To: ${val.to}</h6>
                <h6>Time: ${val.time} </h6>
                <h6>Station: ${val.station}</h6>
                <h6>Cost: 350</h6>`
            }
        })

    })
    })
}

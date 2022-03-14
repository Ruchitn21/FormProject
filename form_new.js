

$(function() {
    
    var $accordion= $("#accordionArea")
    var $heading= $("#heading")
    var $content= $("#content")
    
   
    $.ajax({
        type:"GET",
        url: "http://localhost:3000/api/data",

        success : function(data) {

             $( function() {
                $( ".accordion" ).accordion({
                    collapsible: true
                });
            } ); 
            
           

            $.each(data["data"]["features"],(i,item)=>{
            
                var html= `<div class=accordion id=accordionBox${i}><b>`+item["uuid"]+`<button type='button' class='btn btn-danger btn-sm btn-shift' id=delete${i} onclick=deleteButton(${i})>Delete</button>`+"</b>"+

                `<div class=accordion-box>`+"<b><span class='required'>featureName</span> : </b>"+

                `<input type='textbox' placeholder='Enter Feature Name' value=${item["featureName"]}><br><br>`+

                "<b><span class='required'>uabName</span> : </b>"+`<input type='textbox' size=35 value='${item['uabName']}'><br><br>`+

                "<b><span class='required'>browser</span> : </b>"+`<input type='textbox' id=browser-name${i} value=${item["browser"]}><select name="browser" onchange=browserFunction(event,${i})><option>Select Browser</option><option id=chrome-click${i}>chrome</option><option id=firefox-click${i}>firefox</option></select><br><br>`+

                "<b><span class='required'>node</span> : </b>"+`<input type='textbox' value=${item["node"]}><br><br>`+

                "<b><span class='required'>mavenGoal</span> : </b>"+`<input type='textbox' size="50px" value=${item["mavenGoal"]}><br><br>`+
                "<b>mainTest : </b>"+"<input type='textbox'><br><br>"+"<b>maintenanceTest : </b>"+`<input type='textbox'><br><br>`

                +"<b>associatedUABs : </b>"+`<input type='textbox'><br><br>`

                +"<b>subUABs : </b>"+`<input type='textbox'><br><br>`+

                "<b>associatedUABs : </b>"+`<input type='textbox'><br><br>`+

                `<div class='envExecArea' id=envArea${i}><b>environmentExecutionFlag : </b><input type=text id=newenvName${i} placeholder='New Environment Name'><button onclick=addEnv(${i})>Add Env</button>
                <ul class=envClass id=env-list${i}>
                <li><input type=checkbox name=rad id=cit${i}>cit</li>
                <li><input type=checkbox name=rad id=int${i}>int</li>
                <li><input type=checkbox name=rad id=qcpprd${i}>qcpprd</li>
                <li><input type=checkbox name=rad id=intprd${i}>intprd</li>
                <li><input type=checkbox name=rad id=btprd${i}>btprd</li>
                </ul>
                </div>`+

                `<div class=kv-container id=kv-container${i}><b>kVs : </b><ul id=kv-list${i}><button class='btn btn-success btn-sm' onclick=addKVBox(${i})>Add kV</button><br><br></ul></div>`


                +"</div>"
            
            $accordion.append(html)

            })     
           
            
            var envList= [];
            
            $.each(data["data"]["features"],(i,item)=>{
                $.each(item["environmentExecutionFlag"],(key,value)=>{
                    $.each(value,(key,value)=>{
                        if (value==="Y"){
                            envList.push(key)
                        }
                        }
                    )
                })
            });

            for(let i=0;i<envList.length;i++)
            {
                document.getElementById(`${envList[i]}${i}`).setAttribute("checked",true);
            }

            var kvLengths= [];

            $.each(data["data"]["features"],(i,item)=>{
                kvLengths.push(item["kVs"].length)
            })

            for(let i=0;i<kvLengths.length;i++)
            {
                
                for(let j=0;j<kvLengths[i];j++)
                {
                    $(`#kv-list${i}`).append(`<li><input type=text size=26 value=${Object.keys(data["data"]["features"][i]["kVs"][j])}><input type=text placeholder=kv-value value=${Object.values(data["data"]["features"][i]["kVs"][j])}></li>`)
                }
            }
                 
        }
    });
});
{/* <button class='btn btn-success btn-sm btn-env' onclick=addEnv(${i})>Add Env</button> */}
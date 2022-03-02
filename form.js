$(function() {

    var $featureName= $("#feature-name");
    var $uabName= $("#uab-name")
    var $browserName= $("#browser-name")
    var $nodeName= $("#node-name")
    var $envexecList= $("#envexec-list")
    var $kvList= $("#kv-list")

    $.ajax({
        type:"GET",
        url: "http://localhost:3000/api/data",

        success : function(data){
            $featureName.attr({value:data["data"]["features"][0].featureName})
            $uabName.attr({value:data["data"]["features"][0].uabName})
            $browserName.attr({value:data["data"]["features"][0].browser})
            $nodeName.attr({value:data["data"]["features"][0].node})

            $.each(data["data"]["features"][0]["environmentExecutionFlag"],(i,item)=>{
                $.each(data["data"]["features"][0]["environmentExecutionFlag"][i],(key,value)=>{
                    $envexecList.append("<li>"+key+"->"+value+"</li>")
                })
            })

            $.each(data["data"]["features"][0]["kVs"],(i,item)=>{
                $.each(data["data"]["features"][0]["kVs"][i],(key,value)=>{
                    $kvList.append("<li>"+key+"->"+value+"</li>")
                })
                
            })
            console.log(data["data"]["features"])
        },

        error : function() {
            alert("error loading orders")
        }
    });
});


function submit_run(){
    var token="pk.0c3c7909e60dab1d27f46907c369d500"
    var listRadio=["gsm","umts","lte"]
    var mnc=document.getElementById("mnc").value
    var lac=document.getElementById("lac").value//12764
    var cid=document.getElementById("cell").value
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "text/plain");
    
    
    
    for (const key in listRadio) {
        var raw = "{\"token\": \""+token+"\",\"radio\": \""+listRadio[key]+"\",\"mcc\": 452,\"mnc\": "+mnc+",\"cells\": [{\"lac\": "+lac+",\"cid\": "+cid+"}],\"address\":1}";
        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
          };
        fetch("https://us1.unwiredlabs.com/v2/process.php?", requestOptions)
            .then(function(response){
                return response.text();
            })
            .then(function(resuft){
                var resuft=JSON.parse(resuft);
                console.log(resuft);
                var status =resuft["status"];
                if (status=="ok") {
                    // alert("status-"+listRadio[key])
                    var lat=resuft["lat"];
                    var lon=resuft["lon"];
                    var link_href='https://www.google.com/maps/place/'+lat+','+lon+'/@'+lat+','+lon+',17z'
                    document.getElementById("resuft-"+listRadio[key]+"-link").innerHTML=resuft["address"];
                    document.getElementById("resuft-"+listRadio[key]+"-link").href=link_href;
                    document.getElementById("status-"+listRadio[key]).innerHTML = "Có vị trí "+listRadio[key]+"<br>Tọa độ:"+lat+","+lon;// xử lý trong này với biến là resuft
                   
                } else {
                    document.getElementById("status-"+listRadio[key]).innerHTML = "Không có vị trí "+listRadio[key];
                }
                
            })
            .catch(function(err){
                alert("Lỗi! Mời bạn thử lại");
            })
    }
    
    //   .then(response => response.text())
    //   .then(result => document.getElementById("resuft").innerHTML = result)
    //   .catch(error => alert("Lỗi mạng"));
      
}
function decHex() {
    var CellID=document.getElementById("input-dec").value;
    if (CellID!="") {
        cell=parseInt(CellID[5]+CellID[4]+CellID[7]+CellID[6], 16);
        lac=parseInt(CellID[1]+CellID[0]+CellID[3]+CellID[2], 16);
        document.getElementById("lac").value=lac;
        document.getElementById("cell").value=cell;
        alert("Giá trị Lac - Cell là "+lac+" "+cell+" đã được thêm vào")
    } else {
        alert('Chuỗi nhập vào chưa đúng')
    }
    
}


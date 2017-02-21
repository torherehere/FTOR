export class Appfn{

    public api():string{ 
        return 'http://192.168.0.36:3000/'; 
    } 

    public isEmpty(str:any) {
  		return typeof str == 'string' && !str.trim() || typeof str == 'undefined' || str === null || str.length == 0;
	}

    public getTime(){
		var d = new Date();
		return Math.floor(d.getTime()/1000); 
	}

    public convertTime(date: any){
        return date * 1000;
    }

    public body(obj:any): any{
        return JSON.stringify(obj);
    }

    public urlEncode(url: string){
        var newUrl = url.replace(/\s/g,"-"); 
        return newUrl;
    }

    public urlDecode(url: string){
        var newUrl = url.replace(new RegExp("-", 'g')," "); 
        return newUrl;
    } 

    public changeDateTimeStamp(date: string){
        //var myDate = "26-02-2012";
        var myDate = date.split("-");
        var newDate = myDate[1]+","+myDate[2]+","+myDate[0];
        return new Date(newDate).getTime()/1000; 
    }

    public htmlToPlaintext(text) {
        return text ? String(text).replace(/<[^>]+>/gm, '') : '';
    }
}
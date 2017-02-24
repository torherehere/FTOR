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

    public changeDateTimeStamp(date: string){
        //var myDate = "26-02-2012";
        var myDate = date.split("-");
        var newDate = myDate[1]+","+myDate[2]+","+myDate[0];
        return new Date(newDate).getTime()/1000; 
    }

    dd: any
    mm: any
    yyyy: any 
    public changeDateYMD(date: string){
        var new_date = this.convertTime(date);
        this.dd = new Date(new_date).getDate();
        this.mm = new Date(new_date).getMonth()+1;
        this.yyyy = new Date(new_date).getFullYear();

        if(this.dd < 10){
            this.dd ='0'+this.dd;
        } 

        if(this.mm < 10){
            this.mm ='0'+this.mm;
        } 
        return this.yyyy+'-'+this.mm+'-'+this.dd;  
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

    public htmlToPlaintext(text) {
        return text ? String(text).replace(/<[^>]+>/gm, '') : '';
    }
}
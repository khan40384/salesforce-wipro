public class COVIDDataService {
    private Static string national_data = 'https://api.covid19india.org/data.json';
 	private Static string state_data_api = 'https://api.covid19india.org/state_district_wise.json';
    
    @AuraEnabled(cacheable=true)
    public static COVIDData getNationalData()
    {
        //Getting access token from google
        HttpRequest req = new HttpRequest();
        req.setMethod('GET');
        req.setEndpoint(national_data);
        req.setHeader('content-type', 'application/json');
        req.setTimeout(60*1000);
        
        Http callout = new Http();
        String responseText;
        HttpResponse response = callout.send(req);
        COVIDData responseData=COVIDData.parse(response.getBody());
        return responseData;
    }
    
    @AuraEnabled(cacheable=false)
    public static  List<COVIDSubData> getStateData(string stateName)
    {
        try
        {
            //Getting access token from google
            HttpRequest req = new HttpRequest();
            req.setMethod('GET');
            req.setEndpoint(state_data_api);
            req.setHeader('content-type', 'application/json');
            req.setTimeout(60*1000);
            
            Http callout = new Http();
            String responseText;
            HttpResponse response = callout.send(req);
            
            
            Map<String, Object> params=(Map<String, Object>)JSON.deserializeUntyped(response.getBody());
            Object state=params.get(stateName);
            string dta=JSON.serialize(state);
            
            Map<String, Object> pms=(Map<String, Object>)JSON.deserializeUntyped(dta);
            Object district=pms.get('districtData');
            
            Map<String, Object> ds=(Map<String, Object>)JSON.deserializeUntyped(JSON.serialize(district));
            
            List<COVIDSubData> districtList=new List<COVIDSubData>();	
            for(string str:ds.keyset())
            {
                COVIDSubData dist=new COVIDSubData();
                string jsonData=JSON.serialize(ds.get(str));
                dist=(COVIDSubData)JSON.deserialize(jsonData, COVIDSubData.class);
                dist.districtName=str;
                districtList.add(dist);
            }
            system.debug('districtList:'+districtList);
            return districtList;
        }
        catch(Exception ex)
        {
            return null;
        }
    }
}
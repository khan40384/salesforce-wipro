public class COVIDData {
    @AuraEnabled
    public List<Cases_time_series> cases_time_series;
    @AuraEnabled
    public List<Key_values> key_values;
    @AuraEnabled
    public List<Statewise> statewise;
    @AuraEnabled
    public List<Tested> tested;
    
    public class Key_values {
        @AuraEnabled 
        public String confirmeddelta;
        @AuraEnabled
        public String counterforautotimeupdate;
        @AuraEnabled
        public String deceaseddelta;
        @AuraEnabled
        public String lastupdatedtime;
        @AuraEnabled
        public String recovereddelta;
        @AuraEnabled
        public String statesdelta;
    }
    
    public class Delta {
        @AuraEnabled
        public Integer active;
        @AuraEnabled
        public Integer confirmed;
        
        @AuraEnabled
        public Integer deaths;
        @AuraEnabled
        public Integer recovered;
    }
    
    public class Statewise {
        @AuraEnabled
        public String active;
        @AuraEnabled
        public String confirmed;
        @AuraEnabled
        public String deaths;
        @AuraEnabled
        public Delta delta;
        @AuraEnabled
        public String lastupdatedtime;
        @AuraEnabled
        public String recovered;
        @AuraEnabled
        public String state;
    }
    
    public class Cases_time_series {
        @AuraEnabled
        public String dailyconfirmed;
        @AuraEnabled
        public String dailydeceased;
        @AuraEnabled
        public String dailyrecovered;
        @AuraEnabled
        public String Casedate;
        @AuraEnabled
        public String totalconfirmed;
        @AuraEnabled
        public String totaldeceased;
        @AuraEnabled
        public String totalrecovered;
    }
    
    public class Tested {
        @AuraEnabled
        public String source;
        @AuraEnabled
        public String totalindividualstested;
        @AuraEnabled
        public String totalpositivecases;
        @AuraEnabled
        public String totalsamplestested;
        @AuraEnabled
        public String updatetimestamp;
    }
    
    
    public static COVIDData parse(String json) {
        return (COVIDData) System.JSON.deserialize(json, COVIDData.class);
    }
}

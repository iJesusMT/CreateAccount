import { LightningElement } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { createRecord } from 'lightning/uiRecordApi';
import ACCOUNT_OBJECT from '@salesforce/schema/Account';
import NAME_FIELD from '@salesforce/schema/Account.Name';
import INDUSTRY_FIELD from '@salesforce/schema/Account.Industry';
import PHONE_FIELD from '@salesforce/schema/Account.Phone';
import WEBSITE_FIELD from '@salesforce/schema/Account.Website';

export default class CreateAccount extends LightningElement {
    
    created = false;

    accountName;
    industry;
    phone;
    website;

    handleAccountNameChange(event){
        this.accountName = event.target.value;
    }

    handleIndustryChange(event){
        this.industry = event.target.value;
    }   

    handlePhoneChange(event){
        this.phone = event.target.value;
    }

    handleWebsiteChange(event){
        this.website = event.target.value;
    }
    
    async createAccount() {
        const fields = {};
        fields[NAME_FIELD.fieldApiName] = this.accountName;
        fields[INDUSTRY_FIELD.fieldApiName] = this.industry;
        fields[PHONE_FIELD.fieldApiName] = this.phone;
        fields[WEBSITE_FIELD.fieldApiName] = this.website;

        const recordInput = { apiName: ACCOUNT_OBJECT.objectApiName, fields };

        try{
            const record = await createRecord(recordInput);
            this.created = true;
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Success',
                    message: 'Account created',
                    variant: 'success'
                })
            );
        }catch(error){
            console.error('Error creating record', error);
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Error creating record',
                    message: error,
                    variant: 'error'
                })
            );
        }
    }

    goBack(){
        this.accountId = undefined;
        this.accountName = undefined;
        this.industry = undefined;
        this.phone = undefined;
        this.website = undefined;
        this.created = undefined;
    }
}
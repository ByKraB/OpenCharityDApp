import {Injectable} from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {Observable} from 'rxjs/Observable';
import {
	AppCharityEvent,
	AppIncomingDonation,
	ConfirmationResponse,
	ContractCharityEvent,
	ContractIncomingDonation
} from '../../open-charity-types';
import {Web3ProviderService} from '../../core/web3-provider.service';

// service to share events between components in organization module

@Injectable()
export class OrganizationSharedService {

	/*********************************/
	/****** Events sources ***********/
	/*********************************/

	// triggered when user try to add new charity event
	private _onCharityEventAdded: Subject<AppCharityEvent> = new Subject<AppCharityEvent>();
	private onCharityEventAddedSource = this._onCharityEventAdded.asObservable().share<AppCharityEvent>();

	// triggered when transaction succeed i.e CE stored in blockchain
	private _onCharityEventConfirmed: Subject<ConfirmationResponse> = new Subject<ConfirmationResponse>();
	private onCharityEventConfirmedSource = this._onCharityEventConfirmed.asObservable().share<ConfirmationResponse>();


	// triggered when transaction failed  i.e CE is not stored in blockchain
	private _onCharityEventFailed: Subject<ConfirmationResponse> = new Subject<ConfirmationResponse>();
	private onCharityEventFailedSource = this._onCharityEventFailed.asObservable().share<ConfirmationResponse>();

	// triggered when transaction canceled by user
	private _onCharityEventCanceled: Subject<ConfirmationResponse> = new Subject<ConfirmationResponse>();
	private onCharityEventCanceledSource = this._onCharityEventCanceled.asObservable().share<ConfirmationResponse>();

	/*********************************/

	// triggered when user try to add new incoming donation
	private _onIncomingDonationAdded: Subject<AppIncomingDonation> = new Subject<AppIncomingDonation>();
	private onIncomingDonationAddedSource = this._onIncomingDonationAdded.asObservable().share<AppIncomingDonation>();

	// triggered when transaction succeed i.e CE stored in blockchain
	private _onIncomingDonationConfirmed: Subject<ConfirmationResponse> = new Subject<ConfirmationResponse>();
	private onIncomingDonationConfirmedSource = this._onIncomingDonationConfirmed.asObservable().share<ConfirmationResponse>();


	// triggered when transaction failed  i.e CE is not stored in blockchain
	private _onIncomingDonationFailed: Subject<ConfirmationResponse> = new Subject<ConfirmationResponse>();
	private onIncomingDonationFailedSource = this._onIncomingDonationFailed.asObservable().share<ConfirmationResponse>();

	// triggered when transaction canceled by user
	private _onIncomingDonationCanceled: Subject<ConfirmationResponse> = new Subject<ConfirmationResponse>();
	private onIncomingDonationCanceledSource = this._onIncomingDonationCanceled.asObservable().share<ConfirmationResponse>();


	constructor(private web3ProviderService: Web3ProviderService) {

	}

	/*********************************/
	/****** Methods to emit data *****/

	/*********************************/

	public charityEventAdded(charityEvent: AppCharityEvent): void {
		this._onCharityEventAdded.next(charityEvent);
	}

	public charityEventConfirmed(charityEventInternalId: string, address: string): void {
		this._onCharityEventConfirmed.next({internalId: charityEventInternalId, address: address});
	}

	public charityEventFailed(charityEventInternalId: string, address: string): void {
		this._onCharityEventFailed.next({internalId: charityEventInternalId, address: address});
	}

	public charityEventCanceled(charityEventInternalId: string, address: string): void {
		this._onCharityEventCanceled.next({internalId: charityEventInternalId, address: address});
	}

	public incomingDonationAdded(incomingDonation: AppIncomingDonation): void {
		this._onIncomingDonationAdded.next(incomingDonation);
	}

	public incomingDonationConfirmed(incomingDonationInternalId: string, address: string): void {
		this._onIncomingDonationConfirmed.next({internalId: incomingDonationInternalId, address: address});
	}

	public incomingDonationFailed(incomingDonationInternalId: string, address: string): void {
		this._onIncomingDonationFailed.next({internalId: incomingDonationInternalId, address: address});
	}

	public incomingDonationCanceled(incomingDonationInternalId: string, address: string): void {
		this._onIncomingDonationCanceled.next({internalId: incomingDonationInternalId, address: address});
	}

	/***********************************/
	/** Methods to subscribe to events **/

	/***********************************/

	public onCharityEventAdded(): Observable<AppCharityEvent> {
		return this.onCharityEventAddedSource;
	}

	public onCharityEventConfirmed(): Observable<ConfirmationResponse> {
		return this.onCharityEventConfirmedSource;
	}

	public onCharityEventFailed(): Observable<ConfirmationResponse> {
		return this.onCharityEventFailedSource;
	}

	public onCharityEventCanceled(): Observable<ConfirmationResponse> {
		return this.onCharityEventCanceledSource;
	}


	public onIncomingDonationAdded(): Observable<AppIncomingDonation> {
		return this.onIncomingDonationAddedSource;
	}

	public onIncomingDonationConfirmed(): Observable<ConfirmationResponse> {
		return this.onIncomingDonationConfirmedSource;
	}

	public onIncomingDonationFailed(): Observable<ConfirmationResponse> {
		return this.onIncomingDonationFailedSource;
	}

	public onIncomingDonationCanceled(): Observable<ConfirmationResponse> {
		return this.onIncomingDonationCanceledSource;
	}


	/*********************************/
	/****** Utils ********************/
	/*********************************/

	// this function is used to create a hash string
	// from provided data. this hash is used to provide
	// short term unique internal ids for pending transactions items
	// THIS HASH IS UNIQUE ONLY WITHING CURRENT USER SESSION
	// DON'T STORE IT ON THE SERVER OR ANYWHERE ELSE

	public makePseudoRandomHash(data: ContractCharityEvent | ContractIncomingDonation): string {
		let sourceData = '';

		for (let p in data) {
			sourceData += data[p];
		}

		const randomNumber: number = Math.random() * 1000;
		sourceData += randomNumber.toString();

		return this.web3ProviderService.web3.utils.sha3(sourceData);
	}


}
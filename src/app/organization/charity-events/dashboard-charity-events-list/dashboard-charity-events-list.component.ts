import {Component, NgZone, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {constant, findIndex, merge, reverse, times} from 'lodash';
import {OrganizationContractService} from '../../../core/contracts-services/organization-contract.service';
import {CharityEventContractService} from '../../../core/contracts-services/charity-event-contract.service';
import {TokenContractService} from '../../../core/contracts-services/token-contract.service';
import {CharityEventsListBaseComponent} from '../charity-events-list-base.component';
import {MetaDataStorageService} from '../../../core/meta-data-storage.service';
import {OrganizationSharedService} from '../../services/organization-shared.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ErrorMessageService} from '../../../core/error-message.service';

@Component({
	selector: 'opc-dashboard-charity-events-list',
	templateUrl: 'dashboard-charity-events-list.component.html',
	styleUrls: ['dashboard-charity-events-list.component.scss']
})
export class DashboardCharityEventsListComponent extends CharityEventsListBaseComponent implements OnInit, OnDestroy {
	constructor(protected organizationContractService: OrganizationContractService,
				protected charityEventContractService: CharityEventContractService,
				protected tokenContractService: TokenContractService,
				protected zone: NgZone,
				protected route: ActivatedRoute,
				protected metaDataStorageService: MetaDataStorageService,
				protected modal: NgbModal,
				protected organizationSharedService: OrganizationSharedService,
				protected errorMessageService: ErrorMessageService,
				private router: Router) {
		super(
			organizationContractService,
			tokenContractService,
			charityEventContractService,
			zone,
			metaDataStorageService,
			modal,
			organizationSharedService,
			errorMessageService
		);
	}

	public async ngOnInit() {
		this.route.params.subscribe(params => {
			this.organizationAddress = params['address'];
		});
		await this.updateCharityEventsList();
		this.initEventsListeners();
	}

	public toAllCharityEvents() {
		this.router.navigate([`/organization/${this.organizationAddress}/events`]);
	}
}

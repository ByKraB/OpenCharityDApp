import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {OrganizationContractService} from '../../../core/contracts-services/organization-contract.service';

@Component({
	selector: 'opc-incoming-donations-sources-filter',
	templateUrl: 'incoming-donations-sources-filter.component.html',
	styleUrls: ['incoming-donations-sources-filter.component.scss']
})
export class IncomingDonationsSourcesFilterComponent implements OnInit {
	@Input('organizationAddress') public organizationAddress: string;
	@Output('sourceChanged') public sourceChanged: EventEmitter<number> = new EventEmitter<number>();

	public selectedSource: number = -1;
	public sourcesNamesList: string[] = [];
	public newSourceFormVisible: boolean = false;
	public newSourceFormLoading: boolean = false;
	public newSourceName: string = '';

	constructor(
		private organizationContractService: OrganizationContractService
	) {

	}

	public async ngOnInit() {
		await this.updateListOfSources();
	}

	public async updateListOfSources(): Promise<void>  {
		this.newSourceFormLoading = true;

		const sourceIds: number = parseInt(await this.organizationContractService.getIncomingDonationsSourcesIds(this.organizationAddress));

		for (let i = 0; i < sourceIds; i++) {
			this.sourcesNamesList[i] = await this.organizationContractService.getIncomingDonationSourceName(this.organizationAddress, i);
		}

		this.newSourceFormLoading = false;
	}

	public changeSourceTab(sourceId: number) {
		this.selectedSource = sourceId;
		this.sourceChanged.emit(sourceId);
	}

	public async showNewSourceForm() {
		this.newSourceFormVisible = true;
	}

	public async submitNewSourceForm(newSourceName: string): Promise<void> {
		if (!newSourceName) {
			return;
		}

		this.newSourceFormLoading = true;

		await this.organizationContractService.addNewIncomingDonationsSource(this.organizationAddress, newSourceName);

		this.newSourceFormVisible = false;
		this.newSourceFormLoading = false;

		await this.updateListOfSources();
	}

	public cancelNewSourceForm() {
		this.newSourceFormVisible = false;
	}
}

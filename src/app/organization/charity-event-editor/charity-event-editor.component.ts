import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {Router, ActivatedRoute} from '@angular/router';
import {CharityEventContractService} from '../../core/contracts-services/charity-event-contract.service';

@Component({
	templateUrl: 'charity-event-editor.component.html',
	styleUrls: ['charity-event-editor.component.scss']
})
export class CharityEventEditorComponent implements OnInit, OnDestroy {
	private componentDestroyed: Subject<void> = new Subject<void>();
	public organizationAddress: string = null;
	public charityEventAddress: string = null;
	public name: string = "";
	public transactions: any[] = [];

	constructor(
		private router: Router,
		private route: ActivatedRoute,
		private charityEventContractService: CharityEventContractService
	) { }

	async ngOnInit(): Promise<void> {
		this.route.params.subscribe(params => {
			this.organizationAddress = params["address"];
			this.charityEventAddress = params["event"];
		});
		this.name = await this.charityEventContractService.getName(this.charityEventAddress);
	}

	ngOnDestroy(): void {
		this.componentDestroyed.next();
	}

	goBackToOrganization(event: Event): void {
		this.router.navigate(['/organization', this.organizationAddress]);
		event.preventDefault();
	}
}

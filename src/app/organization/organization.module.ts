import {NgModule} from '@angular/core';
import {CharityEventsListComponent} from './charity-events/charity-events-list/charity-events-list.component';
import {RouterModule} from '@angular/router';
import {OrganizationRoutes} from './organization-routing.module';
import {OrganizationDetailsComponent} from './organization-details/organization-details.component';
import {AddCharityEventComponent} from './charity-events/add-charity-event/add-charity-event.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
// tslint:disable-next-line:max-line-length
import {IncomingDonationsListComponent} from './incoming-donations/incoming-donations-list/incoming-donations-list.component';
// tslint:disable-next-line:max-line-length
import {AddIncomingDonationComponent} from './incoming-donations/add-incoming-donation/add-incoming-donation.component';
import {NgSelectizeModule} from 'ng-selectize';
import {OrganizationsListComponent} from './organizations-list/organizations-list.component';
import {IsOrganizationAddressGuard} from './is-organization-address.guard';
import {TagsBitmaskService} from './services/tags-bitmask.service';
import {SetBitmaskTagsComponent} from './set-bitmask-tags/set-bitmask-tags.component';
import {BitmaskTagsListComponent} from './bitmask-tags-list/bitmask-tags-list.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {IncomingDonationSendFundsModalComponent} from './incoming-donations/incoming-donation-send-funds-modal/incoming-donation-send-funds-modal.component';
import {IsAdminGuard} from './is-admin.guard';
import {OrganizationSharedService} from './services/organization-shared.service';
import {CharityEventsCardComponent} from './charity-events/charity-event-card/charity-events-card.component';
import {ActualCharityEventsComponent} from './charity-events/actual-events/actual-events.component';
import {ActualIncomingDonationsComponent} from './incoming-donations/actual-donations/actual-donations.component';
import {CharityEventsTransactionsHistoryComponent} from './charity-events/charity-events-transactions-history/charity-events-transactions-history.component';
import {CharityEventEditorComponent} from './charity-events/charity-event-editor/charity-event-editor.component';
import {CharityEventsAllComponent} from './charity-events/charity-events-all/charity-events-all.component';
import {IncomingDonationsDetailsComponent} from './incoming-donations/incoming-donations-details/incoming-donations-details.component';
import {IncomingDonationsEditorComponent} from './incoming-donations/incoming-donation-editor/incoming-donation-editor.component';
import {IncomingDonationsAllComponent} from './incoming-donations/incoming-donations-all/incoming-donations-all.component';
import {FileDropModule} from 'ngx-file-drop';
import {CharityEventsListBaseComponent} from './charity-events/charity-events-list-base.component';

@NgModule({
	declarations: [
		OrganizationDetailsComponent,
		CharityEventsListComponent,
		AddCharityEventComponent,
		IncomingDonationsListComponent,
		AddIncomingDonationComponent,
		OrganizationsListComponent,
		SetBitmaskTagsComponent,
		BitmaskTagsListComponent,
		IncomingDonationSendFundsModalComponent,
		CharityEventsCardComponent,
		ActualCharityEventsComponent,
		ActualIncomingDonationsComponent,
		CharityEventsTransactionsHistoryComponent,
		CharityEventEditorComponent,
		CharityEventsAllComponent,
		IncomingDonationsDetailsComponent,
		IncomingDonationsEditorComponent,
		IncomingDonationsAllComponent,
		CharityEventsListBaseComponent
	],
	entryComponents: [IncomingDonationSendFundsModalComponent],
	imports: [
		FormsModule,
		CommonModule,
		RouterModule.forChild(OrganizationRoutes),
		ReactiveFormsModule,
		NgSelectizeModule,
		NgbModule,
		FileDropModule
	],
	providers: [
		IsOrganizationAddressGuard,
		TagsBitmaskService,
		IsOrganizationAddressGuard,
		IsAdminGuard,
		OrganizationSharedService,
	]
})

export class OrganizationModule {
}

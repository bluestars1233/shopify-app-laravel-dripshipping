@extends('layouts.app')
@section('content')

<div class="indexContent" data-page_name="ADD NEW USER">
	<div class="maincontent">
		<div class="wrapinsidecontent">
			<div class="profile">
				<h4>Add New User</h4>
				<h5 style="display: none;" id="success-user">Added successfully.</h5>
				<h5 style="display: none;" id="fail-user">The email already exists.</h5>
				<div class="nuform">
					<div class="user-info">
						<label class="mt-3">User Name<span>*</span></label>
						<input type="text" minlength="3" class="simple-tooltip" title="more than 3 characters" id="txt-user-name" required>
						<p style="display: none;" id="name-error"></p>
					</div>
					<div class="user-info">
						<label class="mt-3">Email<span>*</span> </label>
						<input type="email" id="txt-email" class="simple-tooltip" title="valid email format(e.g. example@email.com)" pattern="([A-Za-z0-9][._]?)+[A-Za-z0-9]@[A-Za-z0-9]+(\.?[A-Za-z0-9]){2}\.(com?|net|org)+(\.[A-Za-z0-9]{2,4})?" autocomplete="email" required>
						<p style="display: none;" id="email-error"></p>
					</div>
					<div class="user-info">
						<label class="mt-3">Password<span>*</span></label>
						<input type="password" minlength="12" class="simple-tooltip" id="txt-password" autocomplete="new-password" title="more than 12 characters, lowercase, uppercase, number, symbol" required><i class="fa fa-eye" data-id="#txt-password"></i>
						<p id="password-error"></p>
					</div>
					<div class="user-info">
						<label class="mt-3">Confirm Password<span>*</span></label>
						<input type="password" minlength="12" class="simple-tooltip" id="txt-confirm-password" autocomplete="new-password" title="more than 12 characters, lowercase, uppercase, number, symbol" required><i class="fa fa-eye" data-id="#txt-confirm-password"></i>
						<p style="display: none;" id="confirm-error"></p>
					</div>
					<div class="update-user">
						<button id="btn-save-user">Save</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
@endsection
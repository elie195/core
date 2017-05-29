/*
 * Copyright (c) 2015
 *
 * This file is licensed under the Affero General Public License version 3
 * or later.
 *
 * See the COPYING-README file.
 *
 */

(function () {
	if (!OC.Share) {
		OC.Share = {};
	}

	var PASSWORD_PLACEHOLDER_STARS = '**********';
	var PASSWORD_PLACEHOLDER_MESSAGE = t('core', 'Choose a password for the public link');
<<<<<<< HEAD
	var PASSWORD_PLACEHOLDER_MESSAGE_OPTIONAL = t('core', 'Choose a password for the public link or press enter');

=======
>>>>>>> d17a83eaa52e94ce1451a9dd610bbc812b80f27e
	var TEMPLATE =
		'<div class="error-message-global hidden"></div>' +
		'<div class="public-link-modal">'+
			'<div class="public-link-modal--item">' +
				'<label class="public-link-modal--label">Link Name</label>' +
				'<input class="public-link-modal--input" type="text" name="linkName" placeholder="{{namePlaceholder}}" value="{{name}}" maxlength="64" />' +
			'</div>' +
			'{{#if publicUploadPossible}}' +
			'<div id="allowPublicUploadWrapper-{{cid}}" class="public-link-modal--item">' +
				'<input type="checkbox" value="1" name="allowPublicUpload" id="sharingDialogAllowPublicUpload-{{cid}}" class="checkbox publicUploadCheckbox" {{{publicUploadChecked}}} />' +
				'<label for="sharingDialogAllowPublicUpload-{{cid}}">{{publicUploadLabel}}</label>' +
			'</div>' +
<<<<<<< HEAD
			'    {{/if}}' +			
			'    {{#if showPasswordCheckBox}}' +
			'<input type="checkbox" name="showPassword" id="showPassword-{{cid}}" class="checkbox showPasswordCheckbox" {{#if isPasswordSet}}checked="checked"{{/if}} value="1" />' +
			'<label for="showPassword-{{cid}}">{{enablePasswordLabel}}</label>' +
			'    {{/if}}' +
			'<div id="linkPass" class="linkPass {{#unless isPasswordSet}}hidden{{/unless}}">' +
			'    <label for="linkPassText-{{cid}}" class="hidden-visually">{{passwordLabel}}</label>' +
			'    {{#if showPasswordCheckBox}}' +
			'    <input id="linkPassText-{{cid}}" class="linkPassText" type="password" placeholder="{{passwordPlaceholder}}" />' +
			'    {{else}}' +
			'    <input id="linkPassText-{{cid}}" class="linkPassText" type="password" placeholder="{{passwordPlaceholderInitial}}" />' +
			'    {{/if}}' +
			'    <span class="icon-loading-small hidden"></span>' +
=======
			'{{/if}}' +
			'<div id="linkPass-{{cid}}" class="public-link-modal--item linkPass">' +
				'<label class="public-link-modal--label" for="linkPassText-{{cid}}">{{passwordLabel}}{{#if isPasswordRequired}}<span class="required-indicator">*</span>{{/if}}</label>' +
				'<input class="public-link-modal--input linkPassText" id="linkPassText-{{cid}}" type="password" placeholder="{{passwordPlaceholder}}" />' +
				'<span class="error-message hidden"></span>' +
>>>>>>> d17a83eaa52e94ce1451a9dd610bbc812b80f27e
			'</div>' +
			'<div class="expirationDateContainer"></div>' +
			'{{#if isMailEnabled}}' +
			'<div class="mailView"></div>' +
			'{{/if}}' +
		'</div>'
	;

	/**
	 * @class OCA.Share.ShareDialogLinkShareView
	 * @member {OC.Share.ShareItemModel} model
	 * @member {jQuery} $el
	 * @memberof OCA.Sharing
	 * @classdesc
	 *
	 * Represents the GUI of the share dialogue
	 *
	 */
	var ShareDialogLinkShareView = OC.Backbone.View.extend({
		/** @type {string} **/
		id: 'shareDialogLinkShare',

		className: 'shareDialogLinkShare',

		/** @type {OC.Share.ShareConfigModel} **/
		configModel: undefined,

		/** @type {OC.Share.ShareItemModel} **/
		itemModel: undefined,

		/** @type {Function} **/
		_template: undefined,

		initialize: function (options) {
			if (!_.isUndefined(options.itemModel)) {
				this.itemModel = options.itemModel;
				this.configModel = this.itemModel.configModel;
			} else {
				throw 'missing OC.Share.ShareItemModel';
			}

			this.expirationView = new OC.Share.ShareDialogExpirationView({
				model: this.model,
				itemModel: this.itemModel
			});

			OC.Plugins.attach('OCA.Share.ShareDialogLinkShareView', this);
		},

		_save: function () {
			var deferred = $.Deferred();
			var $el = this.$el;

			var $password = $el.find('.linkPassText'),
				$permission = $el.find('.publicUploadCheckbox'),
				$inputs = $el.find('.linkPassText, .expirationDate, .permission'), // all input fields combined
				$errorMessageGlobal = $el.find('.error-message-global'),
				$loading = $el.find('.loading'),

				// get values from input elements
				// ***

				password = $password.val(),
				permission = ($permission.is(':checked')) ? OC.PERMISSION_UPDATE | OC.PERMISSION_CREATE | OC.PERMISSION_READ | OC.PERMISSION_DELETE : OC.PERMISSION_READ,
				expirationDate = this.expirationView.getValue();


			$el.find('.error-message').addClass('hidden');


			// remove errors (if present)
			// ***

			$inputs.removeClass('error');
			$errorMessageGlobal.addClass('hidden');

			// explicit attributes to be saved
			var attributes = {
				expireDate: expirationDate,
				permissions: permission,
				name: this.$('[name=linkName]').val(),
				shareType: this.model.get('shareType')
			};

<<<<<<< HEAD
			if($checkBox.is(':checked')) {
				if(this.configModel.get('enforcePasswordForPublicLink') === false && this.configModel.get('enableLinkPasswordByDefault') === false) {
					$loading.removeClass('hidden');
					// this will create it
					this.model.saveLinkShare();
				} else {
					this.$el.find('.linkPass').slideToggle(OC.menuSpeed);
					this.$el.find('.linkPassText').focus();
				}
			} else {
				if (this.model.get('linkShare').isLinkShare) {
					$loading.removeClass('hidden');
					this.model.removeLinkShare();
				} else {
					this.$el.find('.linkPass').slideToggle(OC.menuSpeed);
				}
=======
			// TODO: need a way to clear password (check if "encryptedPassword" was set)
			if (password) {
				// only set password explicitly if changed, else leave previous value
				attributes.password = password;
>>>>>>> d17a83eaa52e94ce1451a9dd610bbc812b80f27e
			}

			var validates = true;
			validates &= this.expirationView.validate();

			if (this.configModel.get('enforcePasswordForPublicLink')
				&& !password
				&& (this.model.isNew() || !this.model.get('encryptedPassword'))
			) {
				$password.addClass('error');
				$password.next('.error-message').removeClass('hidden').text(t('files_sharing', 'Password required'));
				validates = false;
			}

			if (!validates) {
				deferred.reject(this.model);
			}

<<<<<<< HEAD
		onPasswordEntered: function() {
			var $loading = this.$el.find('.linkPass .icon-loading-small');
			if (!$loading.hasClass('hidden')) {
				// still in process
				return;
			}
			var $input = this.$el.find('.linkPassText');
			$input.removeClass('error');
			var password = $input.val();

			if (this.$el.find('.linkPassText').attr('placeholder') === PASSWORD_PLACEHOLDER_MESSAGE_OPTIONAL) {

				// in IE9 the password might be the placeholder due to bugs in the placeholders polyfill
				if(password === PASSWORD_PLACEHOLDER_MESSAGE_OPTIONAL) {
					password = '';
				}
			} else {

				// in IE9 the password might be the placeholder due to bugs in the placeholders polyfill
				if(password === '' || password === PASSWORD_PLACEHOLDER || password === PASSWORD_PLACEHOLDER_MESSAGE) {
					return;
				}
=======
			if (this.model.isNew()) {
				// the API is inconsistent
				attributes.path = this.itemModel.getFileInfo().getFullPath();
>>>>>>> d17a83eaa52e94ce1451a9dd610bbc812b80f27e
			}

			var self = this;

			var done = function() {
				$loading.addClass('hidden');
				deferred.resolve(self.model);
				self.trigger('saved', self.model);
			};

			$loading.removeClass('hidden');

			// save it
			// ***
			this.model.save(attributes, {
				// explicit attributes for patch-like PUT to avoid
				// passing all attributes
				attrs: attributes,
				success: function() {
					if (self.mailView) {
						// also send out email first
						self.mailView.sendEmails().then(done).
							fail(function() {
								// re-show the popup
								self.show();
							});
					} else {
						done();
					}
				},
				error: function (model, xhr) {
					var msg = xhr.responseJSON.ocs.meta.message;
					// destroy old tooltips
					$loading.addClass('hidden');
					$errorMessageGlobal.removeClass('hidden').text(msg);
					deferred.reject(self.model);
				}
			});

			return deferred.promise();
		},

		_remove: function () {
			this.model.destroy();
		},

		render: function () {
			// TODO: in the future to read directly from the FileInfoModel
			var publicUploadPossible = this.itemModel.isFolder() && this.itemModel.createPermissionPossible() && this.configModel.isPublicUploadEnabled();
			var publicUploadChecked  = (this.model.canCreate()) ? 'checked="checked"' : null;

			var isPasswordSet = !!this.model.get('encryptedPassword');

			// only show email field for new shares and if enabled globally
			var showEmailField = this.model.isNew() && this.configModel.isMailPublicNotificationEnabled();

<<<<<<< HEAD
			var isLinkShare = this.model.get('linkShare').isLinkShare;
			var isPasswordSet = !!this.model.get('linkShare').password;
			var showPasswordCheckBox = isLinkShare
				&& (   !this.configModel.get('enforcePasswordForPublicLink')
					|| !this.model.get('linkShare').password);
			var passwordPlaceholderInitial = this.configModel.get('enforcePasswordForPublicLink')
				? PASSWORD_PLACEHOLDER_MESSAGE : PASSWORD_PLACEHOLDER_MESSAGE_OPTIONAL;

			this.$el.html(linkShareTemplate({
=======
			this.$el.html(this.template({
>>>>>>> d17a83eaa52e94ce1451a9dd610bbc812b80f27e
				cid: this.cid,
				fileNameLabel : t('core', 'Filename'),
				passwordLabel: t('core', 'Password'),
<<<<<<< HEAD
				passwordPlaceholder: isPasswordSet ? PASSWORD_PLACEHOLDER : PASSWORD_PLACEHOLDER_MESSAGE,
				passwordPlaceholderInitial: passwordPlaceholderInitial,
=======
				passwordPlaceholder: isPasswordSet ? PASSWORD_PLACEHOLDER_STARS : PASSWORD_PLACEHOLDER_MESSAGE,
				isPasswordRequired: this.configModel.get('enforcePasswordForPublicLink'),
				namePlaceholder: t('core', 'Name'),
				name: this.model.get('name'),
>>>>>>> d17a83eaa52e94ce1451a9dd610bbc812b80f27e
				isPasswordSet: isPasswordSet,
				publicUploadPossible: publicUploadPossible,
				publicUploadChecked: publicUploadChecked,
				publicUploadLabel: t('core', 'Allow uploads'),
				isMailEnabled: showEmailField
			}));

			this.$('.datepicker').datepicker({dateFormat : 'dd-mm-yy'});

			if (showEmailField) {
				this.mailView = new OC.Share.ShareDialogMailView({
					itemModel: this.itemModel,
					configModel: this.configModel,
					model: this.model
				});
				this.mailView.render();
				this.$('.mailView').append(this.mailView.$el);
			} else {
				this.mailView = null;
			}

			this.expirationView.render();
			this.$('.expirationDateContainer').append(this.expirationView.$el);

			this.delegateEvents();

			return this;
		},

		_onClickSave: function() {
			var self = this;
			this._save().then(function() {
				self.$dialog.ocdialog('close');
			});
		},

		_onClickCancel: function() {
			this.$dialog.ocdialog('close');
		},

		_onClickRemove: function() {
			this._remove();
			this.$dialog.ocdialog('close');
		},

		/**
		 * @returns {Function} from Handlebars
		 * @private
		 */
		template: function (data) {
			if (!this._template) {
				this._template = Handlebars.compile(TEMPLATE);
			}
			return this._template(data);
		},

		/**
		 * Display this view inside a popup window
		 */
		show: function() {
			var self = this;
			var title = t('files_sharing', 'Edit link share: {name}', {name : this.itemModel.getFileInfo().getFullPath() });
			if (this.model.isNew()) {
				title = t('files_sharing', 'Create link share: {name}', {name : this.itemModel.getFileInfo().getFullPath() });
			}

			// hack the dialogs
			OC.dialogs.message(
				'',
				title,
				'custom',
				[
					{
						text: t('core', 'Save'),
						click: _.bind(this._onClickSave, this),
						defaultButton: true
					}, {
						text: t('core', 'Cancel'),
						click: _.bind(this._onClickCancel, this)
					}
				],
				null,
				true,
				'public-link-modal'
			).then(function adjustDialog() {
				var $dialogShell = $('.oc-dialog:visible');
				self.render();
				self.$dialog = $dialogShell.find('.oc-dialog-content');
				self.$dialog.html(self.$el);
				self.$el.find('input:first').focus();
			});
		}

	});

	OC.Share.ShareDialogLinkShareView = ShareDialogLinkShareView;

})();

/// <reference path="references.ts" />

module xjs {

	'use strict';

	export function InstagramBackground(): ng.IDirective {
		return {
			priority: 0,
			transclude: false,
			restrict: 'EA',
			controller: xjs.InstagramBackgroundCtrl
		};
	}

}

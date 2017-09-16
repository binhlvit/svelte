import { assign, differs, init, noop, proto } from "svelte/shared.js";

var template = (function() {
	return {
		computed: {
			a: x => x * 2,
			b: x => x * 3
		}
	};
}());

function create_main_fragment(state, component) {

	return {
		create: noop,

		mount: noop,

		update: noop,

		unmount: noop,

		destroy: noop
	};
}

function SvelteComponent(options) {
	init(this, options);
	this._state = options.data || {};
	this._recompute({}, this._state, {}, true);

	this._fragment = create_main_fragment(this._state, this);

	if (options.target) {
		this._fragment.create();
		this._fragment.mount(options.target, options.anchor || null);
	}
}

assign(SvelteComponent.prototype, proto);

SvelteComponent.prototype._recompute = function _recompute(changed, state, oldState, isInitial) {
	if ( isInitial || changed.x ) {
		if (differs((state.a = template.computed.a(state.x)), oldState.a)) changed.a = true;
		if (differs((state.b = template.computed.b(state.x)), oldState.b)) changed.b = true;
	}
}

export default SvelteComponent;
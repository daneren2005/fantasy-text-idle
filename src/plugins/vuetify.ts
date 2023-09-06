import 'vuetify/styles';
import { createVuetify } from 'vuetify';
// @ts-expect-error
import colors from 'vuetify/lib/util/colors';
import 'material-design-icons-iconfont/dist/material-design-icons.css';
import { aliases, md } from 'vuetify/iconsets/md';

export default createVuetify({
	theme: {
		themes: {
			light: {
				dark: false,
				colors: {
					primary: colors.blue.darken1,
					error: colors.red.darken1
				}
			}
		}
	},
	icons: {
		defaultSet: 'md',
    	aliases,
		sets: {
			md
		}
	}
});

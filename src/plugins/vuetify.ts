import 'vuetify/styles';
import { createVuetify } from 'vuetify';
import colors from 'vuetify/lib/util/colors';

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
	}
});

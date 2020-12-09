<template>
	<v-app>
		<router-view></router-view>
	</v-app>
</template>

<script>
export default {
	name: "App",
	data() {
		return { isac: true };
	},
	components: {},
	computed: {
		setBackGroundApp() {
			return {
				app: this.$route.fullPath === "/",
				app__dashboard: this.$route.fullPath != "/",
			};
		},
	},
	methods: {
		checkLogin() {
			if (localStorage.username != "" || localStorage.username != null) {
				this.$router.push("/user");
			}
		},
	},
	mounted() {
		this.checkLogin();
	},
};
</script>

<style>
* {
	margin: 0;
	padding: 0;
}

#app {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;

	height: 100vh;

	position: relative;
}
.app {
	background: linear-gradient(
		rgba(180, 217, 224, 1),
		rgba(51, 110, 123, 1) 70%,
		rgba(48, 69, 88, 1)
	);
	display: flex;
	align-items: center;
	justify-content: center;
}
.app__dashboard {
	background: none;
	display: block;
}
</style>

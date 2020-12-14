<template>
	<v-content>
		<v-container class="fill-height" fluid>
			<v-row align="center" justify="center">
				<v-col cols="12" sm="8" md="8">
					<v-window>
						<v-row>
							<v-col cols="3"></v-col>
							<v-col cols="6" sm="6" md="6">
								<v-card class="rounded-xl" elevation="12">
									<h1
										class="font-weight-bold text-center text-uppercase display-1 blue--text text--darken-3 pa-6 pt-12"
									>
										Sign in
									</h1>
									<v-form class="pa-6 pb-12">
										<v-text-field
											v-model.trim="$v.account.username.$model"
											name="username"
											type="text"
											class="pa-2"
											:errorMessages="errorMessages.user"
											placeholder="User Name"
											prepend-icon="mdi-account-circle"
										>
										</v-text-field>

										<v-text-field
											v-model.trim="$v.account.password.$model"
											name="username"
											type="password"
											class="pa-2"
											:errorMessages="errorMessages.pass"
											placeholder="Password"
											prepend-icon="mdi-shield-key"
										></v-text-field>
										<v-alert
											type="error"
											class="alert-center"
											v-if="isSuccess === false"
										>
											Đăng nhập thất bại !
										</v-alert>
										<v-btn
											color="info"
											large
											class="text-uppercase text-button my-4 font-weight-bold"
											text-size="30px"
											@click="saveUser"
											>đăng nhập</v-btn
										>
									</v-form>
								</v-card>
							</v-col>
						</v-row>
					</v-window>
				</v-col>
			</v-row>
		</v-container>
	</v-content>
</template>

<script>
import { required } from "vuelidate/lib/validators";
export default {
	name: "login",

	data() {
		return {
			account: {
				username: null,
				password: null,
			},
			isSuccess: null,
		};
	},
	validations: {
		account: {
			username: { required },
			password: {
				required,
			},
		},
	},
	computed: {
		errorMessages() {
			let errMess = {
				user: "",
				pass: "",
			};
			if (
				this.$v.account.username.$dirty &&
				!this.$v.account.username.required
			) {
				errMess.user = "Bạn chưa nhập user name !";
			}
			if (
				this.$v.account.password.$dirty &&
				!this.$v.account.password.required
			) {
				errMess.pass = "Bạn chưa nhập pass !";
			}
			return errMess;
		},
	},
	methods: {
		validationStatus(validation) {
			return typeof validation != "undefined" ? validation.$error : false;
		},

		saveUser() {
			this.$v.account.$dirty();
			if (this.$v.account.$pending || this.$v.account.$error) return;
			if (
				this.account.username === "admin1234" &&
				this.account.password === "1234567"
			) {
				this.isSuccess = true;
				localStorage.setItem("username", `${this.account.username}`);
				localStorage.setItem("password", `${this.account.password}`);
				this.$router.push("/user");
				this.$store.dispatch("handleSaveUserName", {
					userName: localStorage.username,
					password: localStorage.password,
				});
			} else {
				this.account.username = "";
				this.account.password = "";
				this.isSuccess = false;
			}
		},
	},
	mounted() {
		this.saveUser();
	},
};
</script>

<style scoped>
.alert-center {
	position: fixed;
	z-index: 1000;
	left: 50%;
	top: 50%;
	-webkit-transform: translate(-50%, -50%);
	transform: translate(-50%, -50%);
}
</style>

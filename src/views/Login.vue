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
											v-model="$v.account.username.$model"
											name="username"
											type="text"
											class="pa-2"
											placeholder="User Name"
											prepend-icon="mdi-account-circle"
										>
										</v-text-field>
										<p
											class="text-left pl-8"
											v-if="!$v.account.username.required"
										>
											Bạn chưa nhập user name !
										</p>
										<p
											class="text-left pl-8"
											v-if="!$v.account.username.minLength"
										>
											User name chưa đúng !
										</p>
										<p
											class="text-left pl-8"
											v-if="!$v.account.username.maxLength"
										>
											User name chưa đúng !
										</p>
										<v-text-field
											v-model="$v.account.password.$model"
											name="username"
											type="password"
											class="pa-2"
											placeholder="Password"
											prepend-icon="mdi-shield-key"
										></v-text-field>
										<p
											class="text-left pl-8"
											v-if="!$v.account.password.required"
										>
											Bạn chưa nhập user name !
										</p>
										<p
											class="text-left pl-8"
											v-if="!$v.account.password.minLength"
										>
											User name chưa đúng !
										</p>
										<p
											class="text-left pl-8"
											v-if="!$v.account.password.maxLength"
										>
											User name chưa đúng !
										</p>
										<v-btn
											color="info"
											large
											class="text-uppercase text-button my-4 font-weight-bold"
											text-size="30px"
											@click="saveUserName"
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
import { required, minLength, maxLength } from "vuelidate/lib/validators";
export default {
	name: "login",
	validations: {
		account: {
			username: { required, minLength: minLength(8), maxLength: maxLength(20) },
			password: {
				required,
				minLength: minLength(6),
				maxLength: maxLength(11),
			},
		},
	},
	data() {
		return {
			account: {
				username: "",
				password: "",
			},
			isSuccess: false,
		};
	},

	methods: {
		validationStatus(validation) {
			return typeof validation != "undefined" ? validation.$error : false;
		},
		saveUserName() {
			this.$v.$touch();
			if (this.$v.$pending || this.$v.$error) return;
			if (
				this.account.username === "admin123" &&
				this.account.password === "123456"
			) {
				this.$router.push("/user");
				this.isSuccess = true;
				localStorage.setItem("username", `${this.account.username}`);
				localStorage.setItem("password", `${this.account.password}`);
				this.$store.dispatch("handleSaveUserName", localStorage.username);
			} else {
				this.account.username = "";
				this.account.password = "";
				this.isSuccess = false;
			}
		},
	},
	mounted() {
		this.saveUserName();
	},
};
</script>

<style scoped></style>

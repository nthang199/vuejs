<template>
	<div class="login">
		<div class="login__input">
			<h2>Login</h2>
			<div class="login__input__infor">
				<div class="login__input__infor__user">
					<input
						type="text"
						name="username"
						id="username"
						v-model="account.username"
						placeholder="Username"
					/>
				</div>
				<div class="login__input__infor__user">
					<input
						type="password"
						name="password"
						id="password"
						v-model="account.password"
						placeholder="Password"
					/>
				</div>
				<div id="login__notification" v-if="!isSuccess">
					Tài khoản hoặc mật khẩu không đúng !
				</div>
				<div class="login__input__infor__button">
					<a @click="saveUserName">Login</a>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import {
	required,
	email,
	minLength,
	maxLength,
} from "vuelidate/lib/validators";
export default {
	name: "login",
	data() {
		return {
			account: {
				username: "",
				password: "",
			},
			isSuccess: false,
		};
	},
	validations: {
		fullname: { required },
		email: { required, email },
		password: { required, minLength: minLength(10), maxLength: maxLength(11) },
	},
	methods: {
		saveUserName() {
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

<style scoped>
.login {
	display: flex;
	align-items: center;
	justify-content: center;
}
.login__input {
	width: 500px;
	height: 500px;
	background: linear-gradient(
		rgba(189, 233, 241, 1),
		rgba(72, 152, 170, 1) 70%,
		rgba(46, 66, 85, 1)
	);
	border-radius: 50%;
	margin: auto;
}
.login__input h2 {
	color: #fff;
	padding-top: 50px;
	font-size: 40px;
	font-weight: 600;
	text-shadow: 2px 2px 2px #ccc;
}
.login__input__infor {
	display: block;
	padding: 5% 15%;
}
.login__input__infor__user {
	height: 60px;
	margin: 20px;
}
.login__input__infor__user label {
	float: left;
	text-align: center;
	font-size: 19px;
	font-weight: 450;
	color: #2d3436;
	padding: 8px;
}
.login__input__infor__user input {
	width: 85%;
	height: 35px;
	border-radius: 25px;
	border: 1px solid #ccc;
	font-size: 18px;
	padding: 7px 8px;
	color: #2d3436;
}
.login__input__infor__user input:focus {
	border-radius: 25px;
}
.login__input__infor__button {
	padding: 20px;
}
.login__input__infor__button a {
	text-decoration: none;
	font-size: 25px;
	color: #fff;
	background-color: rgba(35, 203, 167, 1);
	box-shadow: 2px 2px 2px 2px rgb(33, 190, 156);
	border: 2px solid rgb(33, 190, 156);
	padding: 8px 30px;
	font-weight: 600;
	border-radius: 8px;
	cursor: pointer;
}
#login__notification {
	visibility: hidden;
	color: #f02828;
	font-weight: 450;
	font-size: 16px;
}
.login__input__infor__button a:hover,
.login__input__infor__button a:active {
	background-color: rgba(30, 163, 134, 1);
	box-shadow: 2px 2px 2px 2px rgba(28, 146, 120, 1);
	border: 2px solid rgba(30, 163, 134, 1);
}
</style>

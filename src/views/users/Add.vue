<template>
	<v-row>
		<v-row justify="center">
			<v-dialog v-model="dialog" persistent max-width="600">
				<template v-slot:activator="{ on, attrs }">
					<v-btn
						class=""
						fab
						dark
						x-small
						color="#1E88E5"
						elevation="12"
						v-bind="attrs"
						v-on="on"
					>
						<v-icon dark>
							mdi-pencil
						</v-icon>
					</v-btn>
				</template>
				<v-card>
					<v-card-title class="headline text-center text-uppercase">
					</v-card-title>
					<v-card-text>
						<v-form class="pa-6 pb-6">
							<v-text-field
								name="username"
								type="text"
								class="px-2"
								v-model="user.userName"
								placeholder="User Name"
							>
							</v-text-field>
							<v-text-field
								name="name"
								type="text"
								class="px-2"
								v-model="user.name"
								placeholder="Name"
							></v-text-field>

							<v-text-field
								name="age"
								type="text"
								class="px-2"
								v-model="user.age"
								placeholder="Age"
							>
							</v-text-field>

							<div class="d-flex align-end justify-start px-2 pr-6 ">
								<span
									class="red--text text--darken-1 rounded-pill mr-12"
									style="border:1px solid gray;"
									><v-icon>mdi-account mdi-36px</v-icon></span
								>
								<v-file-input
									hide-input
									v-model="file"
									filled
									persistent-hint
									prepend-icon="mdi-upload mdi-36px"
									placeholder="Age"
									@change="imageAvatar"
								>
								</v-file-input></div></v-form
					></v-card-text>
					<v-card-actions>
						<v-spacer></v-spacer>
						<v-btn color="blue darken-3" text @click="dialog = false">
							Cancel
						</v-btn>
						<v-btn color="blue darken-3" text @click="saveUser">
							Save
						</v-btn>
					</v-card-actions>
				</v-card>
			</v-dialog>
		</v-row>
	</v-row>
</template>

<script>
export default {
	name: "user-add",
	props: {
		user: { type: Object, default: null },
	},

	data() {
		return {
			dialog: false,
			file: null,
			isActiveAddUser: null,
		};
	},
	methods: {
		inputAvatar() {
			this.$refs.avatarInput.click();
		},
		imageAvatar() {
			console.log(this.file.name);
		},
		saveUser() {
			this.dialog = false;
			if (this.file != null) {
				this.user.avatar = this.file.name;
			}
			if (
				this.user.userName != "" &&
				this.user.name != "" &&
				this.user.age > 0 &&
				this.user.avatar != ""
			) {
				this.$emit("saveUser", {
					action: this.isActiveAddUser,
					user: this.user,
				});
			}
		},
		cancel() {
			this.$emit("cancel");
			this.user = null;
		},
		checkAddUser() {
			if (this.user.userName === "") {
				this.isActiveAddUser = true;
			} else {
				this.isActiveAddUser = false;
			}
		},
	},
	mounted() {
		this.checkAddUser();
	},
};
</script>

<style scoped>
.user__add {
	background: linear-gradient(rgba(129, 207, 224, 1), rgba(52, 152, 219, 1));
	padding: 20px;
	border-radius: 10px;
	width: 500px;
}
.user__add h2 {
	margin: 15px auto;
	color: #fff;
	font-size: 25px;
	font-weight: 600;
	text-transform: uppercase;
}
.user__add__info {
	display: flex;
	align-items: baseline;
}
.user__add__info label {
	width: 30%;
	float: left;
	font-size: 20px;
	color: #fff;
	font-weight: 550;
	text-align: left;
}
.user__add__info input {
	margin: 10px 15px 10px 5px;
	width: 60%;
	float: right;
	height: 25px;
	border-radius: 8px;
	border: 1px solid #ccc;
	font-size: 18px;
	padding: 7px 40px 7px;
	color: #2d3436;
}
.fileAvatar {
	display: none;
}

.user__add__info__inputfile {
	margin: 10px 5px;
	width: 65%;
	float: right;
	height: 25px;
	border-radius: 8px;
	display: flex;
	font-size: 18px;
	padding: 7px 40px 7px;
	color: #2d3436;
}
.user__add__info__inputfile a:hover,
.user__add__info__inputfile a:active {
	cursor: pointer;
}
.user__add__info__action {
	display: flex;
	align-items: center;
	justify-content: space-evenly;
	margin: 30px;
}
.user__add__info__action a {
	padding: 10px 25px;
	border: 1px solid #ccc;
	border-radius: 7px;
	background: #fff;
	font-size: 20px;
	width: 60px;
	font-weight: 600;
}
.user__add__info__action a:hover,
.user__add__info__action a:active {
	cursor: pointer;
	background: #ccc;
}
</style>

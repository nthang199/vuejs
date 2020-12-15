<template>
	<v-content
		class="d-flex justify-center"
		:class="[isLoading ? 'align-center' : 'align-start']"
	>
		<v-progress-circular
			v-if="isLoading"
			indeterminate
			color="#4FC3F7"
		></v-progress-circular>
		<v-alert
			class="alert-center text-center"
			v-if="hideAlert"
			:type="alert.type"
			width="30%"
			elevation="12"
			>{{ alert.message }}</v-alert
		>
		<v-window class="mx-auto" v-if="!isLoading">
			<v-card-text class="d-flex  align-center justify-end pr-12">
				<v-avatar size="46" color="primary">
					<v-icon size="36" color="white">mdi-account-tie </v-icon>
				</v-avatar>
				<p class="ma-0 mx-4 subtitle-1">{{ userName }}</p>
			</v-card-text>
			<v-card-title class="d-flex align-center justify-center">
				<h1
					class="font-weight-bold text-center text-uppercase  text-h6 text-sm-h5 text-md-h4 blue--text text--darken-3 "
				>
					Danh sách người dùng
				</h1>
			</v-card-title>
			<v-card-text>
				<v-row class="px-16">
					<v-col class="d-flex align-center" cols="12" sm="6" md="6"
						><v-text-field
							name="search"
							type="text"
							v-model="userSearch"
							placeholder="Search"
							dense
							height="45px"
							class="body-1"
							rounded
							filled
							color="#757575"
						>
						</v-text-field
					></v-col>
					<v-col
						class="d-flex justify-end  align-start "
						cols="12"
						sm="6"
						md="6"
					>
						<v-btn
							class="sm-fab"
							dark
							large
							color="#1E88E5"
							elevation="12"
							@click="openDialogAdd(user)"
						>
							<v-icon dark>
								mdi-plus
							</v-icon>
							Thêm mới
						</v-btn>
					</v-col>
					<Add
						v-if="isOpenDialogAdd"
						:user="user"
						:isOpenDialogAdd="isOpenDialogAdd"
						:isActiveAddUser="isActiveAddUser"
						@saveUser="saveUser"
						@closeDialogAdd="closeDialogAdd"
					></Add>
				</v-row>
				<v-simple-table class="table--bg mx-16  py-4" elevation="24">
					<template>
						<thead>
							<tr>
								<th
									class="text-uppercase text-left grey--text text--darken-4 text-body-2 font-weight-bold"
								>
									Stt
								</th>
								<th
									class="text-uppercase text-left grey--text text--darken-4 text-body-2 font-weight-bold"
								>
									user name
								</th>
								<th
									class="text-uppercase text-left grey--text text--darken-4 text-body-2 font-weight-bold"
								>
									Name
								</th>
								<th
									class="text-uppercase text-left grey--text text--darken-4 text-body-2 font-weight-bold"
								>
									age
								</th>
								<th
									class="text-uppercase text-left grey--text text--darken-4 text-body-2 font-weight-bold"
								>
									avatar
								</th>
								<th
									class="text-uppercase text-center left grey--text text--darken-4 text-body-2 font-weight-bold"
								>
									action
								</th>
							</tr>
						</thead>
						<tbody>
							<tr v-for="(user, index) in users" :key="index">
								<td class="text-left text-subtitle-2">{{ index + 1 }}</td>
								<td class="text-left text-subtitle-2">{{ user.userName }}</td>
								<td class="text-left text-subtitle-2">{{ user.name }}</td>
								<td class="text-left text-subtitle-2">{{ user.age }}</td>
								<td class="text-left text-subtitle-2">{{ user.avatar }}</td>
								<td class="d-flex align-center justify-sm-space-around">
									<v-btn
										class=""
										dark
										fab
										x-small
										color="#1E88E5"
										elevation="12"
										@click="openDialogEdit(user)"
									>
										<v-icon dark>
											mdi-pencil
										</v-icon>
									</v-btn>

									<v-btn
										dark
										fab
										x-small
										color="#D32F2F"
										elevation="12"
										@click="openDialogDelete(user)"
									>
										<v-icon dark>
											mdi-delete
										</v-icon>
									</v-btn>
								</td>
							</tr>
						</tbody>
						<Delete
							v-if="isOpenDialogDelete"
							:user="user"
							:isOpenDialogDelete="isOpenDialogDelete"
							@deleteUser="deleteUser"
							@closeDialogDelete="closeDialogDelete"
						></Delete>
					</template>
				</v-simple-table>
			</v-card-text>
			<v-row>
				<v-col md="6" sm="12" xs="12" offset-md="6">
					<template>
						<div class="d-flex align-center justify-end px-16 py-6">
							<v-pagination
								v-model="page"
								:length="5"
								:total-visible="7"
							></v-pagination>
						</div>
					</template>
				</v-col>
			</v-row>
		</v-window>
	</v-content>
</template>

<script>
import Vue from "vue";
import axios from "axios";
import VueAxios from "vue-axios";
import Add from "./Add";
import Delete from "./Delete";
Vue.use(VueAxios, axios);
export default {
	name: "user-dashboard",
	components: { Add, Delete },
	data() {
		return {
			userSearch: "",
			users: null,
			user: {
				userName: null,
				name: null,
				age: 0,
				avatar: null,
			},
			alert: {
				type: "",
				message: "",
			},
			isActiveAddUser: false,
			isActiveDeleteUser: false,
			isOpenDialogAdd: false,
			isOpenDialogDelete: false,
			pages: null,
			page: 1,
			isLoading: true,
		};
	},
	methods: {
		async getAllUsers() {
			await this.axios
				.get("https://5fb6229236e2fa00166a4f32.mockapi.io/api/v1/users")
				.then((result) => {
					this.users = result.data;
				})
				.catch((err) => console.log(err));
			this.pages = Math.ceil(this.users.length / 9);
			this.setUserProp();
			return this.users;
		},
		closeDialogAdd() {
			this.isOpenDialogAdd = false;
		},
		closeDialogDelete() {
			this.isOpenDialogDelete = false;
		},
		openDialogAdd() {
			this.isOpenDialogAdd = true;
			this.isActiveAddUser = true;
		},
		openDialogEdit(user) {
			this.isOpenDialogAdd = true;
			this.isActiveAddUser = false;
			this.user.id = user.id;
			this.user.userName = user.userName;
			this.user.name = user.name;
			this.user.age = user.age;
			this.user.avatar = user.avatar;
		},
		openDialogDelete(user) {
			this.isOpenDialogDelete = true;
			this.isActiveDeleteUser = true;
			this.user.id = user.id;
			this.user.userName = user.userName;
			this.user.name = user.name;
			this.user.age = user.age;
			this.user.avatar = user.avatar;
		},
		async saveUser(object) {
			this.closeDialogAdd();
			if (object.action) {
				await this.axios
					.post("https://5fb6229236e2fa00166a4f32.mockapi.io/api/v1/users", {
						userName: object.user.userName,
						name: object.user.name,
						age: object.user.age,
						avatar: object.user.avatar,
					})
					.then(() => {
						this.alert.type = "success";
						this.alert.message = "Lưu thành công !";
						this.getAllUsers();
					})
					.catch(() => {
						this.alert.type = "error";
						this.alert.message = "Đã có lỗi xảy ra !";
					});
			} else if (!object.action) {
				await this.axios
					.put(
						"https://5fb6229236e2fa00166a4f32.mockapi.io/api/v1/users/" +
							object.user.id,
						object.user
					)
					.then(() => {
						this.alert.type = "success";
						this.alert.message = "Lưu thành công !";
						this.getAllUsers();
					})
					.catch(() => {
						this.alert.type = "error";
						this.alert.message = "Đã có lỗi xảy ra !";
					});
			}
			this.setAlert();
			this.setUserProp();
		},
		async deleteUser(userId) {
			this.closeDialogDelete();
			await this.axios
				.delete(
					"https://5fb6229236e2fa00166a4f32.mockapi.io/api/v1/users/" + userId
				)
				.then(() => {
					this.getAllUsers();
					this.alert.type = "success";
					this.alert.message = "Xoá thành công !";
				})
				.catch(() => {
					this.alert.type = "error";
					this.alert.message = "Đã có lỗi xảy ra !";
				});
			this.setUserProp();
			this.setAlert();
		},
		cancle() {
			this.isActiveAddUser = false;
			this.isActiveEditUser = false;
		},

		swapUser(user1, user2) {
			let userTemplate;
			userTemplate = user1;
			user1 = user2;
			user2 = userTemplate;
		},
		setUserName() {
			this.$store.dispatch("handleSaveUserName", {
				userName: localStorage.username,
				password: localStorage.password,
			});
		},
		setUserProp() {
			this.user.userName = null;
			this.user.name = null;
			this.user.age = 0;
			this.user.avatar = null;
		},
		closeLoading() {
			setTimeout(() => {
				this.isLoading = false;
			}, 500);
		},
		setAlert() {
			setTimeout(() => {
				this.alert.type = "";
				this.alert.message = "";
			}, 500);
		},
	},
	computed: {
		userName() {
			let user = this.$store.getters.user;

			return user.userName;
		},
		hideAlert() {
			if (this.alert.type != "" && !this.isLoading) {
				return true;
			} else {
				return false;
			}
		},
		size() {
			const size = { xs: "x-small", sm: "small", lg: "large", xl: "x-large" }[
				this.$vuetify.breakpoint.name
			];
			return size ? { [size]: true } : {};
		},
	},
	mounted() {
		this.getAllUsers();
		this.setUserName();
		this.setUserProp();
		this.closeLoading();
	},
	watch: {
		userSearch: {
			deep: true,

			handler() {
				if (this.userSearch != "") {
					this.users = this.users.filter((user) => {
						return user.name.search(this.userSearch) > -1;
					});
				} else {
					this.getAllUsers();
				}
			},
		},
	},
};
</script>

<style scoped>
.table--bg {
	background-color: #e9e9e9 !important;
	border-radius: 10px;
	box-shadow: 0px 3px 3px 3px #d1d1d1 !important;
}
.alert-center {
	position: fixed;
	z-index: 1000;
	left: 50%;
	top: 50%;
	-webkit-transform: translate(-50%, -50%);
	transform: translate(-50%, -50%);
}
</style>

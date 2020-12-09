<template>
	<!--<div class="user__dashboard">
		<div class="user__account">
			<vue-fontawesome
				icon="user"
				size="2.1"
				color="rgba(46, 49, 49, 1)"
			></vue-fontawesome>
			<p class="user__account-username">{{ userName }}</p>
		</div>
		<div class="user__dashboard__title"><h2>Danh sách người dùng</h2></div>
		<div class="user__dashboard__action">
			<input
				type="text"
				name=""
				id=""
				placeholder="Search"
				v-model="userSearch"
				@input="searchUser()"
				@change="searchUser()"
			/>
			<vue-fontawesome
				icon="search"
				size="1.5"
				color="rgba(191, 191, 191, 1)"
				class="search"
			></vue-fontawesome>
			<a class="user__dashboard__action-add" @click="activeAddUser"
				>Thêm người dùng</a
			>
			<div class="user__dashboard__add" v-if="isActiveAddUser">
				<UserAdd
					:user="user"
					@cancel="cancle"
					@saveUser="saveUser"
					:isActiveAddUser="isActiveAddUser"
					>Thêm mới user</UserAdd
				>
			</div>
		</div>
		<div class="user__dashboard__table">
			<table>
				<thead class="user__dashboard__table__header">
					<th class="user__dashboard__table__header-stt">STT</th>
					<th class="user__dashboard__table__header-username">User Name</th>
					<th class="user__dashboard__table__header-name">Name</th>
					<th class="user__dashboard__table__header-age">Age</th>
					<th class="user__dashboard__table__header-avatar">Avatar</th>
					<th class="user__dashboard__table__header-action">Action</th>
				</thead>
				<tr
					class="user__dashboard__table__item"
					v-for="(user, index) in users"
					:key="index"
					:class="setBackGround(index)"
				>
					<td class="user__dashboard__table__header-stt">
						{{ index + 1 }}
					</td>
					<td class="user__dashboard__table__header-username">
						{{ user.userName }}
					</td>
					<td class="user__dashboard__table__header-name">
						{{ user.name }}
					</td>
					<td class="user__dashboard__table__header-age">
						{{ user.age }}
					</td>
					<td class="user__dashboard__table__header-avatar">
						{{ user.avatar }}
					</td>
					<td class="user__dashboard__table__header-action">
						<a class="action-edit" @click="chooseEditUser(index)"
							><vue-fontawesome
								icon="pencil"
								size="1.3 "
								color="#fff"
							></vue-fontawesome
						></a>
						<div class="user__dashboard__add " v-if="isActiveEditUser">
							<UserAdd :user="user" @cancel="cancle" @saveUser="saveUser"
								>Sửa thông tin người dùng</UserAdd
							>
						</div>
						<a class="action-delete" @click="chooseDeleteUser(index)"
							><vue-fontawesome
								icon="trash-o"
								size="1.3"
								color="#fff"
							></vue-fontawesome
						></a>
						<div class="user__dashboard__delete" v-if="isActiveDeleteUser">
							<UserDelete
								:userDelete="userDelete"
								@cancelDeleteUser="cancelDeleteUser"
								>Bạn có chắc chắn muốn xoá người dùng
								{{ user.userName }}</UserDelete
							>
						</div>
					</td>
				</tr>
			</table>
		</div>

		<div class="user__dashboard__paging">
			<a
				><vue-fontawesome
					icon="chevron-left"
					size="1"
					color="rgba(46, 49, 49, 1)"
				></vue-fontawesome
			></a>
			<a>1</a>
			<a>2</a>
			<a>3</a>
			<a>4</a>
			<a>5</a>
			<a
				><vue-fontawesome
					icon="chevron-right"
					size="1"
					color="rgba(46, 49, 49, 1)"
				></vue-fontawesome
			></a>
		</div>
	</div>-->
	<v-content>
		<v-window class="mx-auto">
			<v-card-text class="d-flex  align-center justify-end pr-12">
				<v-avatar size="46" color="primary">
					<v-icon size="36" color="white">mdi-account-tie</v-icon>
				</v-avatar>
				<p class="ma-0 mx-4 subtitle-1">{{ userName }}</p>
			</v-card-text>
			<v-card-title class="d-flex align-center justify-center">
				<h1
					class="font-weight-bold text-center text-uppercase display-1 blue--text text--darken-3 "
				>
					Danh sách người dùng
				</h1>
			</v-card-title>
			<v-card-text>
				<v-row class="px-16">
					<v-col cols="6" class="d-flex align-center "
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
							@input="searchUser()"
							@change="searchUser()"
						>
						</v-text-field
					></v-col>

					<v-col cols="4"></v-col>
					<v-col cols="2" class="d-flex align-start justify-end">
						<Add :user="user" @saveUser="saveUser">Thêm mới người dùng</Add>
					</v-col>
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
									class="text-uppercase text-center grey--text text--darken-4 text-body-2 font-weight-bold"
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
								<td class="d-flex align-center justify-sm-center">
									<Add :user="user" @saveUser="saveUser"
										>Sửa thông tin người dùng</Add
									>
									<Delete :user="user" @deleteUser="deleteUser"></Delete>
								</td>
							</tr>
						</tbody>
					</template>
				</v-simple-table>
			</v-card-text>
			<template>
				<div class="d-flex align-center justify-end px-16 py-6">
					<v-pagination
						v-model="page"
						:length="15"
						:total-visible="7"
					></v-pagination>
				</div>
			</template>
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
				userName: "",
				name: "",
				age: "",
				avatar: "",
			},
			isActiveAddUser: false,
			pages: null,
			page: 1,
			userDelete: null,
		};
	},
	methods: {
		async getAllUsers() {
			await this.axios
				.get("https://5fb6229236e2fa00166a4f32.mockapi.io/api/v1/users")
				.then((result) => {
					this.users = result.data;
					this.Allusers = result.data;
				})
				.catch((err) => console.log(err));
			this.pages = Math.ceil(this.users.length / 9);
			return this.users;
		},

		activeAddUser() {
			this.user.userName = "";
			this.user.name = "";
			this.user.age = 1;
			this.user.avatar = "";
			this.isActiveAddUser = true;
			this.isActiveEditUser = false;
		},
		async saveUser(object) {
			if (object.action) {
				await this.axios
					.post("https://5fb6229236e2fa00166a4f32.mockapi.io/api/v1/users", {
						userName: object.user.userName,
						name: object.user.name,
						age: object.user.age,
						avatar: object.user.avatar,
					})
					.then(() => {
						this.getAllUsers();
					})
					.catch((err) => console.log(err));
			} else if (!object.action) {
				await this.axios
					.put(
						"https://5fb6229236e2fa00166a4f32.mockapi.io/api/v1/users/" +
							object.user.id,
						object.user
					)
					.catch((err) => console.log(err));
			}
		},
		async deleteUser(userId) {
			this.isActiveDeleteUser = false;
			await this.axios
				.delete(
					"https://5fb6229236e2fa00166a4f32.mockapi.io/api/v1/users/" + userId
				)
				.then(() => {
					this.getAllUsers();
				})
				.catch((err) => {
					console.log(err);
				});
		},
		cancle() {
			this.isActiveAddUser = false;
			this.isActiveEditUser = false;
		},
		searchUser() {
			this.users = this.Allusers;
			this.users = this.users.filter((user) => {
				return user.name.search(this.userSearch) > -1;
			});
		},
		setUserName() {
			this.$store.dispatch("handleSaveUserName", localStorage.username);
		},
	},
	computed: {
		userName() {
			return this.$store.getters.userName;
		},
	},
	mounted() {
		this.getAllUsers();
		this.setUserName();
	},
};
</script>

<style scoped>
.table--bg {
	background-color: #e9e9e9 !important;
	border-radius: 10px;
	box-shadow: 0px 3px 3px 3px #d1d1d1 !important;
}
</style>

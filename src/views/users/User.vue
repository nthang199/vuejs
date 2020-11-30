<template>
	<div class="user__dashboard">
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
	</div>
</template>

<script>
import Vue from "vue";
import axios from "axios";
import VueAxios from "vue-axios";
import UserAdd from "./UserAdd";
import UserDelete from "../../components/users/UserDeletePopup";
Vue.use(VueAxios, axios);
export default {
	name: "user-dashboard",
	components: { UserAdd, UserDelete },
	data() {
		return {
			userSearch: "",
			users: null,
			user: {
				userName: "",
				name: "",
				age: 0,
				avatar: "",
			},
			isActiveAddUser: false,
			isActiveEditUser: false,
			isActiveDeleteUser: false,
			pages: null,
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
		setBackGround(indexUser) {
			return { "user__dashboard__table__item-background": indexUser % 2 === 1 };
		},
		activeAddUser() {
			this.user.userName = "";
			this.user.name = "";
			this.user.age = 1;
			this.user.avatar = "";
			this.isActiveAddUser = true;
			this.isActiveEditUser = false;
		},
		async saveUser(user) {
			if (this.isActiveAddUser && !this.isActiveEditUser) {
				await this.axios
					.post("https://5fb6229236e2fa00166a4f32.mockapi.io/api/v1/users", {
						userName: user.userName,
						name: user.name,
						age: user.age,
						avatar: user.avatar,
					})
					.then(() => {
						this.getAllUsers();
					})
					.catch((err) => console.log(err));
				this.isActiveAddUser = false;
			} else if (!this.isActiveAddUser && this.isActiveEditUser) {
				await this.axios
					.put(
						"https://5fb6229236e2fa00166a4f32.mockapi.io/api/v1/users/" +
							user.id,
						user
					)
					.catch((err) => console.log(err));
			}
		},
		chooseDeleteUser(index) {
			this.isActiveDeleteUser = true;
			this.userDelete = this.users[index];
			this.isActiveAddUser = false;
			this.isActiveEditUser = false;
		},
		async deleteUser() {
			this.isActiveDeleteUser = false;
			await this.axios
				.delete(
					"https://5fb6229236e2fa00166a4f32.mockapi.io/api/v1/users/" +
						this.userDelete.id
				)
				.then(() => {
					this.getAllUsers();
				})
				.catch((err) => {
					console.log(err);
				});
		},
		cancelDeleteUser() {
			this.isActiveDeleteUser = false;
		},
		chooseEditUser(index) {
			this.userEdit = this.users[index];
			this.isActiveEditUser = true;
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
.user__dashboard {
	margin: 1% 8%;
}
.user__account {
	height: 50px;
	text-align: right;
	display: flex;
	align-items: center;
	justify-content: flex-end;
}
.user__account-username {
	padding: 0 20px;
	font-size: 16px;
	font-weight: 450;
}
.user__dashboard__title {
	margin: 20px 0;
	text-transform: uppercase;
	font-size: 20px;
	color: rgba(46, 49, 49, 1);
}
.user__dashboard__action {
	display: flex;
	align-items: center;
	justify-content: space-between;
	position: relative;
}
.user__dashboard__action .search {
	position: absolute;
	left: 15px;
}
.user__dashboard__action input {
	margin: 10px 5px;
	width: 45%;
	height: 25px;
	border-radius: 8px;
	border: 1px solid #ccc;
	font-size: 18px;
	padding: 7px 40px 7px;
	color: #2d3436;
}
.user__dashboard__action-add {
	text-decoration: none;
	border: 1px solid #ccc;
	padding: 10px 15px;
	border-radius: 8px;
	font-size: 18px;
	font-weight: 500;
	margin: 10px 5px;
}
.user__dashboard__action-add:hover,
.user__dashboard__action-add:active {
	cursor: pointer;
	background-color: rgba(191, 191, 191, 1);
}

.user__dashboard__table {
	height: 100%;
	border-radius: 10px;
}
.user__dashboard__table table {
	display: block;
}
.user__dashboard__table__header {
	display: table;
	width: 100%;
	height: 50px;
	font-size: 20px;
	font-weight: 600;
	background-color: rgba(232, 232, 232, 1);
}
.user__dashboard__table__item {
	display: table;
	width: 100%;
	height: 40px;
	font-size: 18px;
	font-weight: 500;
}
.user__dashboard__table__item:hover {
	background-color: rgba(191, 191, 191, 1);
}
.user__dashboard__table__header-stt {
	width: 5%;
}
.user__dashboard__table__header-username {
	width: 15%;
}
.user__dashboard__table__header-name {
	width: 15%;
}
.user__dashboard__table__header-age {
	width: 10%;
}
.user__dashboard__table__header-avatar {
	width: 20%;
}
.user__dashboard__table__header-action {
	width: 15%;
}
.user__dashboard__table__header-action a {
	text-decoration: none;
	padding: 2px 5px 2px 5px;
	border-radius: 5px;
	margin: 0 5px;
}
.user__dashboard__table__header-action a:hover,
.user__dashboard__table__header-action a:active {
	cursor: pointer;
}
.action-edit {
	background-color: rgb(56, 178, 243);
}
.action-edit:hover {
	background-color: rgb(48, 161, 221);
}
.action-delete {
	background-color: rgb(247, 58, 58);
}
.action-delete:hover {
	background-color: rgb(230, 36, 36);
}
.user__dashboard__table__item-background {
	background-color: rgba(232, 232, 232, 1);
}
.user__dashboard__add {
	position: absolute;
	top: 20%;
	left: 27.5%;
	width: 45%;
}
.user__dashboard__delete {
	position: absolute;
	top: 30%;
	left: 27.5%;
	width: 45%;
}
.user__dashboard__paging {
	display: flex;
	align-items: center;
	justify-content: flex-end;
	position: absolute;
	right: 10%;
	bottom: 8%;
}
.user__dashboard__paging a {
	margin: 20px 5px;
	border: 1px solid rgb(47, 149, 204);
	padding: 5px 10px;
	border-radius: 3px;
}
.user__dashboard__paging a:hover,
.user__dashboard__paging a:active {
	cursor: pointer;
	background: rgb(56, 178, 243);
}
</style>

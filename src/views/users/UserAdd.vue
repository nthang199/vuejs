<template>
	<div class="user__add">
		<h2 id="user__add__edit-title">
			<slot></slot>
		</h2>
		<div class="user__add__info">
			<label>User name</label>
			<input
				type="text"
				name=""
				id="userName"
				placeholder="Username"
				v-model="user.userName"
				:disabled="!isActiveAddUser"
			/>
		</div>
		<div class="user__add__info">
			<label>Name</label>
			<input type="text" name="" id="" placeholder="Name" v-model="user.name" />
		</div>
		<div class="user__add__info">
			<label>Age</label>
			<input type="text" name="" id="" placeholder="Age" v-model="user.age" />
		</div>
		<div class="user__add__info ">
			<label>Avatar</label>
			<div class="user__add__info__inputfile">
				<a @click="inputAvatar"
					><vue-fontawesome
						icon="upload"
						size="2.5"
						color="#000"
					></vue-fontawesome
				></a>
				<input
					type="file"
					ref="avatarInput"
					class="fileAvatar"
					@change="imageAvatar"
				/>
			</div>
		</div>
		<div class="user__add__info__action">
			<a @click="saveUser">Save</a>
			<a @click="cancel">Cancel</a>
		</div>
	</div>
</template>

<script>
export default {
	name: "user-add",
	props: {
		user: { type: Object, default: null },
		isActiveAddUser: Boolean,
	},
	data() {
		return {};
	},
	methods: {
		inputAvatar() {
			this.$refs.avatarInput.click();
		},
		imageAvatar() {
			this.user.avatar = this.$refs.avatarInput.files[0].name;
		},
		saveUser() {
			if (
				this.user.userName != "" &&
				this.user.name != "" &&
				this.user.age > 0 &&
				this.user.avatar != ""
			) {
				this.$emit("saveUser", this.user);
			}
		},
		cancel() {
			this.$emit("cancel");
			this.user = null;
		},
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

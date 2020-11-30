<template>
	<div class="user__delete_popup">
		<h3><slot></slot></h3>
		<div class="user__delete__popup__action">
			<a @click="deleteUser">OK</a>
			<a @click="cancelDeleteUser">Cancel</a>
		</div>
	</div>
</template>

<script>
export default {
	name: "user-delete-popup",
	props: { userDelete: { type: Object, default: null } },
	data() {
		return {};
	},
	methods: {
		deleteUser() {
			this.$parent.deleteUser();
		},
		cancelDeleteUser() {
			this.$emit("cancelDeleteUser");
		},
	},
};
</script>

<style scoped>
.user__delete_popup {
	background: linear-gradient(rgba(129, 207, 224, 1), rgba(52, 152, 219, 1));
	padding: 20px;
	border-radius: 5px;
}
.user__delete_popup h3 {
	margin: 15px auto;
	color: #fff;
	font-size: 18px;
	font-weight: 550;
}
.user__delete__popup__action {
	display: flex;
	align-items: center;
	justify-content: flex-end;
}
.user__delete__popup__action a {
	width: 50px;
	border: 1px solid #ccc;
	margin: 15px 10px;
	color: #000;
	padding: 5px 10px;
	border-radius: 5px;
	font-weight: 550;
	background-color: #fff;
}
.user__delete__popup__action a:hover,
.user__delete__popup__action a:active {
	background-color: rgb(226, 226, 226);
	cursor: pointer;
}
</style>

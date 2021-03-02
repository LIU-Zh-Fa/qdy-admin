<template>
  <div class="navbar">
    <!-- 伸缩按钮 -->
    <hamburger id="hamburger-container" :is-active="sidebar.opened" class="hamburger-container" @toggleClick="toggleSideBar" />
    <!-- 面包屑 -->
    <breadcrumb id="breadcrumb-container" class="breadcrumb-container" :isShow="breadcrumb" />
    <!-- 右侧菜单 -->
    <div class="right-menu">
      <template v-if="device!=='mobile'">
        <!-- 全屏 -->
        <!-- <screenfull id="screenfull" class="right-menu-item hover-effect" /> -->
        <!-- 布局大小 -->
        <!-- <el-tooltip content="布局大小" effect="dark" placement="bottom"> -->
          <!-- <size-select id="size-select" class="right-menu-item hover-effect" /> -->
        <!-- </el-tooltip> -->
        <!-- 语言选择 -->
        <!-- <LangSelect class="right-menu-item hover-effect" /> -->
      </template>
      <!-- 头像下拉 -->
      <el-dropdown class="avatar-container right-menu-item hover-effect" trigger="click">
        <div class="avatar-wrapper">
          <img :src="avatar" class="user-avatar">
          <i class="el-icon-caret-bottom" />
        </div>
        <el-dropdown-menu slot="dropdown">
          <!-- <router-link to="/user/profile">
            <el-dropdown-item>个人中心</el-dropdown-item>
          </router-link>
          <el-dropdown-item @click.native="setting = true">
            <span>布局设置</span>
          </el-dropdown-item> -->
          <el-dropdown-item @click.native="logout">
            <span>退出登录</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'
import Screenfull from '@/components/Screenfull'
import SizeSelect from '@/components/SizeSelect'
import LangSelect from '@/components/LangSelect'
import { calcDate } from "@/utils/date";
import { validatenull } from '@/utils/validate'
import website from '@/config/website'
export default {
  components: {
    Breadcrumb,
    Hamburger,
    Screenfull,
    SizeSelect,
    LangSelect
  },
  data(){
    return {
       //刷新token锁
      refreshLock: false,
      //刷新token的时间
      refreshTime: "",
    }
  },
  mounted() {
    //实时检测刷新token
    this.refreshToken()
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'avatar',
      'device',
      'last_refresh_token_time'
    ]),
    setting: {
      get() {
        return this.$store.state.settings.showSettings
      },
      set(val) {
        this.$store.dispatch('settings/changeSetting', {
          key: 'showSettings',
          value: val
        })
      }
    },
    breadcrumb() {
      return this.$store.state.settings.showBreadcrumb
    }
  },
  methods: {
        //10分钟检测一次token
    refreshToken() {
      this.refreshTime = setInterval(() => {
        const date = calcDate(
          this.last_refresh_token_time,
          new Date().getTime()
        );
        if (validatenull(date)) return;
        const token = this.$store.state.user.token
        if (token && date.seconds >= website.tokenTime && !this.refreshLock) {
          this.refreshLock = true;
          this.$store
            .dispatch("RefreshToken")
            .then(() => {
              this.refreshLock = false;
            })
            .catch(() => {
              this.refreshLock = false;
            });
        }
      }, 1000 * 60 * 10 );
    },
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
    async logout() {
      this.$confirm('确定注销并退出系统吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$store.dispatch('LogOut').then(() => {
          // location.href = '/';
          this.$router.push({ path: '/login' })
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0,21,41,.08);

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background .3s;
    -webkit-tap-highlight-color:transparent;

    &:hover {
      background: rgba(0, 0, 0, .025)
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .errLog-container {
    display: inline-block;
    vertical-align: top;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background .3s;

        &:hover {
          background: rgba(0, 0, 0, .025)
        }
      }
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        margin-top: 5px;
        position: relative;

        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>

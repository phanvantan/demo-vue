import User from '../components/user.vue'
import { expect } from 'chai'
import { shallowMount } from '@vue/test-utils';

let wrapper;

describe('User', () => {
  it('has props', () => {
    expect(User.props).to.have.property('user');
    expect(User.props.user()).to.be.an('object');
  });
});

describe('Methods', () => {
  beforeEach(() => {
    user = {
      id: '1',
      name: 'tan',
      actived: false
    };
    wrapper = shallowMount(User, {
      propsData: {
        user
      },
    });
  });
  describe('.toggleActived', () => {
    it('should emit toggleActived when click user', () => {
      wrapper.vm.toggleActived(user);
      expect(wrapper.vm.toggleActived).to.be.equal(user);
      expect(wrapper.emitted('toggleActived')).to.be.equal(user);
    });

    it('should emit deleteUser when click delete user', () => {
      wrapper.vm.deleteUser('1');
      expect(wrapper.vm.deleteUser).to.be.equal('1');
      expect(wrapper.emitted('deleteUser')).to.be.equal('1')
    });
  });
});

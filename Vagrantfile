# -*- mode: ruby -*-
# vi: set ft=ruby :

Vagrant.configure("2") do |config|

  config.vm.box = "ubuntu/trusty64"

  config.vm.provision :shell, path: "sh/vagrant.sh"

  config.vm.network :forwarded_port, host: 1981, guest: 1981

  config.vm.provider "virtualbox" do |v|
    v.customize ["setextradata", :id, "VBoxInternal2/SharedFoldersEnableSymlinksCreate/v-root", "1"]
  end

end
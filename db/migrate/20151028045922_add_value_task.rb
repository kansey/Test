class AddValueTask < ActiveRecord::Migration
  def change
    add_column :tasks, :value, :boolean
  end
end

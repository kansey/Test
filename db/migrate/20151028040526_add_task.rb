class AddTask < ActiveRecord::Migration
  def change
    create_table :tasks do |t|
      t.integer :subject_id
      t.string  :title
      t.text    :description
      t.text    :link

      t.timestamps null: false
    end
  end
end

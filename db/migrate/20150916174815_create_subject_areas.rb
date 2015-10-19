class CreateSubjectAreas < ActiveRecord::Migration
  def change
    create_table :subject_areas do |t|
      t.integer :user_id
      t.json    :data, default: {}

      t.timestamps null: false
    end
  end
end

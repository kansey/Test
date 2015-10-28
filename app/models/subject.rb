class Subject < ActiveRecord::Base
  belongs_to :subject_area
  has_many :task, :dependent => :delete_all
end

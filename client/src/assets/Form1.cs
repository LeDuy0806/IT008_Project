using System.Data;
using System.Data.SqlClient;

namespace SQL
{
    public partial class Form1 : Form
    {
        private string _Connection;
        private SqlConnection cnn;

        public Form1()
        {
            InitializeComponent();
            _Connection = @"Data Source=.\sqlexpress;Initial Catalog=QLGV;Integrated Security=True";
            try
            {
                cnn = new SqlConnection(_Connection);
                cnn.Open();
            }
            catch (Exception ex)
            {
                _Connection = string.Empty;
                MessageBox.Show(ex.Message);    
                return;
            }
        }
        ~Form1()
        {
            cnn.Close();
        }

        private void Form1_Load(object sender, EventArgs e)
        {
            DataSet ds = new DataSet();
            string sqlCommand = @"SELECT MAHV, HO + TEN as 'Ho va ten', NGSINH FROM HOCVIEN";
            SqlDataAdapter sqlDataAdapter = new SqlDataAdapter(sqlCommand, cnn);
            sqlDataAdapter.Fill(ds, "HOCVIEN_TABLE");
            cnn.Close();
            dataGridView1.DataSource = ds;
            dataGridView1.DataMember = "HOCVIEN_TABLE";
        }

        private void label2_Click(object sender, EventArgs e)
        {

        }

        private void dataGridView1_CellClick(object sender, DataGridViewCellEventArgs e)
        {
            try
            {
                DataGridViewRow row = dataGridView1.SelectedRows[0];
                mahv.Text = row.Cells[0].Value.ToString();
                hoten.Text = row.Cells[1].Value.ToString();
                ngaysinh.Text = row.Cells[2].Value.ToString();
            }
            catch (Exception ex)
            {
                MessageBox.Show(ex.Message);
            }
        }

        private void delete_btn_Click(object sender, EventArgs e)
        {
            DataGridViewRow row = dataGridView1.SelectedRows[0];
            string id = row.Cells[0].Value.ToString();
            try
            {

                using (var sc = new SqlConnection(_Connection))
                using (var cmd = sc.CreateCommand())
                {
                    sc.Open();
                    cmd.CommandText = $"DELETE FROM HOCVIEN WHERE MAHV = @MAHV";
                    cmd.Parameters.AddWithValue("@MAHV", id);
                    cmd.ExecuteNonQuery();
                }
                MessageBox.Show("Deleted!");
                cnn.Open();
                cnn.Close();
            }
            catch (Exception ex)
            {
                MessageBox.Show(ex.Message);
            }

        }
    }
}
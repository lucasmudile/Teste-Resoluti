using Application.Exceptions;
using Application.Wrappers;
using AutoMapper;
using Domain.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using Resoluti.Application.DTOs;
using Resoluti.Application.Interfaces.Repositories;
using Resoluti.Application.Interfaces.Services;
using System.IdentityModel.Tokens.Jwt;
using System.Net;
using System.Security.Claims;
using System.Text;

namespace Resoluti.Application.Services
{
    public class UserService : IUserService
    {
        private readonly IUserRepository _userRepository;
        private readonly IMapper _mapper;
        private readonly JWTSettings _jwtSettings;

        public UserService(IUserRepository userRepository,IMapper mapper, IOptions<JWTSettings> jwtSettings)
        {
            _mapper = mapper;
            _jwtSettings = jwtSettings.Value;
            _userRepository = userRepository;
        }

        public UserService(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        public async Task<Response<User>> GetById(Guid id)
        {
            try
            {
                var user = await this._userRepository.GetByGUIDAsync(id);

                if (user != null)
                {
                    return new Response<User>(user, Constantes.Constantes.RegistoEliminado);
                }
                return new Response<User>(Constantes.Constantes.RegistoNaoEncontrado);

            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<Response<LoginResponseDTO>> Login(UserLogin login)
        {
            var user = await _userRepository.Login(login.Email, login.Password);

            if (user != null)
            {
                JwtSecurityToken jwtSecurityToken = await GenerateJWToken();
                string token = new JwtSecurityTokenHandler().WriteToken(jwtSecurityToken);

                var loginResponse = new LoginResponseDTO
                {
                    Id=user.Id,
                    Email = user.Email,
                    UserName = user.UserName,
                    Token = token,
                };
                return new Response<LoginResponseDTO>(loginResponse, "Authenticated");
            }
                
            else
                return new Response<LoginResponseDTO>("Usuário ou Senha Incorreta");
        }


        private async Task<JwtSecurityToken> GenerateJWToken()
        {

            var claims = new[]
           {
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
           };

            var symmetricSecurityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_jwtSettings.Key));
            var signingCredentials = new SigningCredentials(symmetricSecurityKey, SecurityAlgorithms.HmacSha256);

            var jwtSecurityToken = new JwtSecurityToken(
                issuer: _jwtSettings.Issuer,
                audience: _jwtSettings.Audience,
                claims: claims,
                expires: DateTime.UtcNow.AddDays(_jwtSettings.DurationInDays),
                signingCredentials: signingCredentials);
            return jwtSecurityToken;
        }

        public async Task<Response<User>> RegisterAsync(UserAddDTO saveUser)
        {
            try
            {
                var user = _mapper.Map<User>(saveUser);
                user.Id = Guid.NewGuid();

                var result = await _userRepository.AddAsync(user);
                return new Response<User>(result, Constantes.Constantes.RegistoSalvo);
            }
            catch (Exception ex)
            {
                throw new ApiException(ex.Message);
            }
        }

        public async Task<Response<User>> RemoveAsync(Guid id)
        {
            try
            {
                var user = await this._userRepository.GetByGUIDAsync(id);

                if (user != null)
                {
                    await _userRepository.DeleteAsync(user);
                    return new Response<User>(user, Constantes.Constantes.RegistoEliminado);

                }
                return new Response<User>(Constantes.Constantes.RegistoNaoEncontradoEliminar);

            }
            catch (Exception ex)
            {
                throw new ApiException(ex.Message);
            }
        }

        public async Task<PagedResponse<List<User>>> SelectAll(DefaultQueryParameters defaultQuery)
        {
            try
            {
                return await _userRepository.SelectAllUsers(defaultQuery.PageNumber,defaultQuery.PageSize,defaultQuery.Search);
            }
            catch (Exception ex)
            {
                throw new ApiException(ex.Message);
            }
        }

        public async Task<Response<User>> UpdateAsync(UserUpdateDTO updateUser)
        {
            try
            {
                var user = await _userRepository.GetByGUIDAsync(updateUser.Id);

                if (user != null)
                {
                    user.UserName = updateUser.UserName;
                    user.Email = updateUser.Email;
                    user.Telephone = updateUser.Telephone;

                    await _userRepository.UpdateAsync(user);
                    return new Response<User>(user, Constantes.Constantes.RegistoSalvo);

                }
                return new Response<User>(Constantes.Constantes.RegistoNaoEncontradoActualizado);
            }
            catch (Exception ex)
            {
                throw new ApiException(ex.Message);
            }
        }
    }
}
